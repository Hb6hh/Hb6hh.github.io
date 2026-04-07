import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const PROFILE_URL = "https://tryhackme.com/p/mrhamad";

function toNumber(v) {
  if (v == null) return null;
  const s = String(v).replace(/,/g, "").trim();
  const m = s.match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

/**
 * Scans the rendered DOM for a stat card whose label exactly matches
 * `labelText` and returns the numeric value displayed in that card.
 *
 * Strategy: walk every text node in the page body looking for one whose
 * trimmed content equals the label. Once found, climb up the DOM (up to
 * MAX_DEPTH levels) and at each level collect all candidate numeric text
 * nodes. When `skipPercentage` is true, any numeric node whose immediate
 * parent element contains "%" or the word "top" is excluded (this prevents
 * the "top X%" badge from being read as the rank). The largest remaining
 * number is returned in that mode; otherwise the first match wins.
 */
async function extractStatByLabel(page, labelText, { skipPercentage = false } = {}) {
  return page.evaluate(
    ({ label, skipPercentage }) => {
      const MAX_DEPTH = 6;

      function isNumericText(t) {
        return t != null && /^\d[\d,]*$/.test(t.trim());
      }

      /** Returns true when a numeric text node is part of a "top X%" display. */
      function isPercentageContext(textNode) {
        const parent = textNode.parentElement;
        if (!parent) return false;
        const parentText = parent.textContent || "";
        // Direct parent contains "%" → this number is a percentage value
        if (parentText.includes("%")) return true;
        // Direct parent contains "top" (e.g. "top 6") → percentage badge context
        if (/\btop\b/i.test(parentText)) return true;
        // Next sibling starts with "%" (e.g. <span>6</span><span>%</span>)
        const next = textNode.nextSibling;
        if (next && (next.textContent || "").trimStart().startsWith("%")) return true;
        return false;
      }

      function findNumbersInSubtree(root) {
        const nums = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
        while (walker.nextNode()) {
          const t = walker.currentNode.textContent?.trim();
          if (!isNumericText(t)) continue;
          if (skipPercentage && isPercentageContext(walker.currentNode)) continue;
          nums.push(t.replace(/,/g, ""));
        }
        return nums;
      }

      // Collect all text nodes whose trimmed content equals the label
      const labelNodes = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      while (walker.nextNode()) {
        if (walker.currentNode.textContent?.trim() === label) {
          labelNodes.push(walker.currentNode);
        }
      }

      for (const labelNode of labelNodes) {
        let container = labelNode.parentElement;
        for (let depth = 0; depth < MAX_DEPTH && container; depth++) {
          const nums = findNumbersInSubtree(container);
          if (nums.length > 0) {
            if (skipPercentage) {
              // Return the largest integer (the actual rank, not a "top X%" badge)
              return String(nums.reduce((max, n) => Math.max(max, Number(n)), -Infinity));
            }
            return nums[0];
          }
          container = container.parentElement;
        }
      }

      return null;
    },
    { label: labelText, skipPercentage }
  );
}

async function main() {
  console.log("Launching Chromium...");
  const browser = await chromium.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(60_000);

    console.log(`Navigating to ${PROFILE_URL} ...`);
    await page.goto(PROFILE_URL, { waitUntil: "domcontentloaded" });

    // Wait until at least the "Rank" label has been rendered by the React app
    await page
      .waitForFunction(() => document.body.innerText.includes("Rank"), { timeout: 30_000 })
      .catch(() => {
        console.warn('Timed out waiting for "Rank" text – proceeding anyway');
      });

    // Small grace period for remaining cards to hydrate
    await page.waitForTimeout(2_000);

    const [rankRaw, badgesRaw, completedRoomsRaw, pointsRaw] = await Promise.all([
      // skipPercentage: true prevents the "top X%" badge from being read as the rank
      extractStatByLabel(page, "Rank", { skipPercentage: true }),
      extractStatByLabel(page, "Badges"),
      extractStatByLabel(page, "Completed rooms"),
      extractStatByLabel(page, "Points"),
    ]);

    console.log("Raw extracted values →", { rankRaw, badgesRaw, completedRoomsRaw, pointsRaw });

    const rank = toNumber(rankRaw);
    const badges = toNumber(badgesRaw);
    const completed_rooms = toNumber(completedRoomsRaw);
    const points = toNumber(pointsRaw);

    // Fail loudly if required stats are missing so the workflow doesn't
    // silently commit a JSON full of nulls.
    const missing = [];
    if (rank === null) missing.push("rank");
    if (badges === null) missing.push("badges");
    if (completed_rooms === null) missing.push("completed_rooms");

    // Regression guard: a real rank is a large integer (typically in the tens
    // of thousands or more). If we end up with a tiny number (≤ 1000) it almost
    // certainly means we read a "top X%" badge instead of the actual rank.
    if (rank !== null && rank <= 1000) {
      missing.push(`rank plausibility (got ${rank}, expected > 1000 – likely read "top X%" instead of actual rank)`);
    }

    if (missing.length > 0) {
      const screenshotPath = "/tmp/thm-debug.png";
      await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
      throw new Error(
        `Could not extract required stats: ${missing.join(", ")}.\n` +
          `Debug screenshot saved to ${screenshotPath}.\n` +
          "TryHackMe may have changed its page structure – update the label strings in the script."
      );
    }

    const data = {
      username: "mrhamad",
      profile_url: PROFILE_URL,
      rank,
      badges,
      completed_rooms,
      points,
      updated_at: new Date().toISOString(),
    };

    await fs.mkdir("public", { recursive: true });
    await fs.writeFile(
      path.join("public", "tryhackme.json"),
      JSON.stringify(data, null, 2) + "\n",
      "utf8"
    );

    console.log("Updated public/tryhackme.json →", data);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
