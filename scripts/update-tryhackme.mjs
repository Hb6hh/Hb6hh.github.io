import fs from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";

const PROFILE_URL = "https://tryhackme.com/p/mrhamad";

function pickNumber(text) {
  const m = (text || "").replace(/,/g, "").match(/(\d+)/);
  return m ? Number(m[1]) : null;
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
  cheerio.load(html);

  const fullText = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().toLowerCase();

  const sliceAround = (label, n = 300) => {
    const i = fullText.indexOf(label);
    return i >= 0 ? fullText.slice(i, i + n) : "";
  };

  const data = {
    username: "mrhamad",
    profile_url: PROFILE_URL,
    rank: pickNumber(sliceAround("rank")),
    badges: pickNumber(sliceAround("badges")),
    completed_rooms: pickNumber(sliceAround("completed rooms")),
    points: pickNumber(sliceAround("points")),
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
