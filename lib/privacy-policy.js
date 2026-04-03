import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "./render-markdown.js";

const PRIVACY_PATH = path.join(process.cwd(), "content", "privacy.md");

/**
 * @returns {Promise<{ html: string; updatedLabel: string }>}
 */
export async function getPrivacyPolicy() {
  let raw;
  try {
    raw = await fs.readFile(PRIVACY_PATH, "utf8");
  } catch {
    return {
      html: "",
      updatedLabel: "",
    };
  }

  const parsed = matter(raw);
  const html = await markdownToHtml(parsed.content);

  const updatedRaw = parsed.data?.updated ?? parsed.data?.lastUpdated;
  let date = null;
  if (updatedRaw != null && String(updatedRaw).trim() !== "") {
    const d = new Date(updatedRaw);
    if (!Number.isNaN(d.getTime())) date = d;
  }

  const stat = await fs.stat(PRIVACY_PATH).catch(() => null);
  if (!date && stat) {
    date = stat.mtime;
  }

  const updatedLabel = date
    ? date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Seoul",
      })
    : "";

  return { html, updatedLabel };
}
