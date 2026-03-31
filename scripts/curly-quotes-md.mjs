/**
 * posts/*.md — 직선 ' " → 곡따옴표
 * - YAML: title / description / category 값 내부만 (구분용 " 유지)
 * - 본문: ``` 펜스 안·밖 모두, 인라인 `코드` 만 제외
 */
import fs from "fs";

const filePath = process.argv[2] || "posts/vibe-coding-blog-day-04.md";
const s = fs.readFileSync(filePath, "utf8");

function convertDoubles(str) {
  let out = "";
  let open = true;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '"') {
      out += open ? "\u201C" : "\u201D";
      open = !open;
    } else {
      out += str[i];
    }
  }
  return out;
}

function convertSingles(str) {
  let out = "";
  let open = true;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === "'") {
      const prev = str[i - 1] || "";
      const next = str[i + 1] || "";
      if (/[a-zA-Z]/.test(prev) && /[a-zA-Z]/.test(next)) {
        out += "\u2019";
        continue;
      }
      out += open ? "\u2018" : "\u2019";
      open = !open;
    } else {
      out += c;
    }
  }
  return out;
}

function convertSegment(str) {
  return convertSingles(convertDoubles(str));
}

function processInlineBackticks(text) {
  const parts = text.split(/(`[^`]*`)/g);
  return parts
    .map((part, i) => (i % 2 === 1 ? part : convertSegment(part)))
    .join("");
}

/** 펜스 블록 전체를 한 덩어리로 두고, 안쪽은 인라인 ` 만 보호 */
function processBody(body) {
  const parts = body.split(/(```[\s\S]*?```)/g);
  return parts.map((chunk) => processInlineBackticks(chunk)).join("");
}

function processYamlValueLines(yaml) {
  return yaml
    .split(/\r?\n/)
    .map((line) => {
      if (/^tags:\s*\[/.test(line)) return line;
      const m = /^(title|description|category):\s*(.*)$/.exec(line);
      if (!m) return line;
      const key = m[1];
      const val = m[2];
      if (val.startsWith('"') && val.endsWith('"')) {
        const inner = val.slice(1, -1);
        return `${key}: "${convertSegment(inner)}"`;
      }
      return line;
    })
    .join("\n");
}

const fmMatch = s.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
if (!fmMatch) {
  console.error("No frontmatter");
  process.exit(1);
}

const out = `---\n${processYamlValueLines(fmMatch[1])}\n---\n${processBody(s.slice(fmMatch[0].length))}`;
fs.writeFileSync(filePath, out, "utf8");
console.log("OK:", filePath);
