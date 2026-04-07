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
 * MAX_DEPTH levels) and at each level scan all sibling leaf-elements for a
 * value that consists solely of digits (with optional commas). The first
 * match wins.
 */
async function extractStatByLabel(page, labelText) {
  return page.evaluate((label) => {
    const MAX_DEPTH = 6;

    function isNumericText(t) {
      return t != null && /^\d[\d,]*$/.test(t.trim());
    }

    function findNumberInSubtree(root) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
      while (walker.nextNode()) {
        const t = walker.currentNode.textContent?.trim();
        if (isNumericText(t)) return t;
      }
      return null;
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
        const num = findNumberInSubtree(container);
        if (num !== null) return num;
        container = container.parentElement;
      }
    }

    return null;
  }, labelText);
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
      extractStatByLabel(page, "Rank"),
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
