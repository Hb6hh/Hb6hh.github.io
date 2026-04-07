import fs from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";

const PROFILE_URL = "https://tryhackme.com/p/mrhamad";

function toNumber(v) {
  if (v == null) return null;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const s = String(v).replace(/,/g, "");
  const m = s.match(/-?\d+(\.\d+)?/);
  return m ? Number(m[0]) : null;
}

function deepFind(obj, predicate) {
  const out = [];
  const seen = new Set();

  function walk(v, pathArr) {
    if (v && typeof v === "object") {
      if (seen.has(v)) return;
      seen.add(v);

      if (predicate(v, pathArr)) out.push({ value: v, path: pathArr });

      if (Array.isArray(v)) {
        for (let i = 0; i < v.length; i++) walk(v[i], pathArr.concat([String(i)]));
      } else {
        for (const [k, val] of Object.entries(v)) walk(val, pathArr.concat([k]));
      }
    }
  }

  walk(obj, []);
  return out;
}

function findFirstNumberByKeyLike(root, keyRegex) {
  // finds objects that have keys matching keyRegex and value is number-like
  const hits = deepFind(root, (v) => v && typeof v === "object" && !Array.isArray(v));
  for (const h of hits) {
    for (const [k, val] of Object.entries(h.value)) {
      if (keyRegex.test(k)) {
        const n = toNumber(val);
        if (n != null) return n;
      }
    }
  }
  return null;
}

async function main() {
  const res = await fetch(PROFILE_URL, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; Hb6hh.github.io bot; +https://github.com/Hb6hh/Hb6hh.github.io)",
      accept: "text/html",
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  // Collect JSON candidates from script tags
  const jsonCandidates = [];
  $("script").each((_, el) => {
    const text = $(el).text()?.trim();
    if (!text) return;

    // only take reasonably sized blobs (avoid huge chunks if you want)
    if (text.startsWith("{") || text.startsWith("[")) {
      jsonCandidates.push(text);
    }

    // also capture assignment blobs like: window.__SOMETHING__ = {...}
    const assignMatch = text.match(/=\s*({[\s\S]*})\s*;?\s*$/);
    if (assignMatch) jsonCandidates.push(assignMatch[1]);
  });

  let best = null;

  for (const cand of jsonCandidates) {
    try {
      const parsed = JSON.parse(cand);

      // We prefer parsed blobs that contain multiple expected concepts
      const asString = JSON.stringify(parsed).toLowerCase();
      const score =
        (asString.includes("rank") ? 1 : 0) +
        (asString.includes("badge") ? 1 : 0) +
        (asString.includes("room") ? 1 : 0) +
        (asString.includes("point") ? 1 : 0);

      if (!best || score > best.score) best = { parsed, score };
    } catch {
      // ignore
    }
  }

  // If no JSON found, fail loudly so we can adjust
  if (!best) {
    throw new Error(
      "Could not find embedded JSON on TryHackMe profile page. Page may be heavily client-rendered."
    );
  }

  const root = best.parsed;

  // Try a few key patterns (TryHackMe may name them differently)
  const rank =
    findFirstNumberByKeyLike(root, /rank/i) ??
    findFirstNumberByKeyLike(root, /leaderboard/i);

  const badges = findFirstNumberByKeyLike(root, /badges?/i);

  const completed_rooms =
    findFirstNumberByKeyLike(root, /completed.*rooms?/i) ??
    findFirstNumberByKeyLike(root, /rooms?.*completed/i);

  const points =
    findFirstNumberByKeyLike(root, /points?/i) ??
    findFirstNumberByKeyLike(root, /score/i);

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

  console.log("Updated public/tryhackme.json", data);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
