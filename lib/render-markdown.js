import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

/**
 * rehype-slug는 h1~h6에 id를 붙이므로, 기존 동작에 맞게 h2·h3만 id 유지.
 */
function rehypeHeadingIdsH2H3Only() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (!node.tagName) return;
      if (node.tagName === "h2" || node.tagName === "h3") return;
      if (
        ["h1", "h4", "h5", "h6"].includes(node.tagName) &&
        node.properties
      ) {
        delete node.properties.id;
      }
    });
  };
}

/**
 * micromark에서 `**용어(영문)**다`처럼 `)` 직후 `**`로 닫고 바로 한글 등이 붙으면
 * 강조가 인식되지 않는 경우가 있어, 닫는 `**` 뒤에 좁은 공백(U+202F)을 넣는다.
 */
function fixMarkdownBoldAfterCloseParen(markdown) {
  return markdown.replace(
    /\)\*\*(?!\u202F)([^\s\n\r])/g,
    (_, ch) => `)**\u202F${ch}`,
  );
}

/**
 * @param {string} markdown
 * @returns {Promise<string>}
 */
export async function markdownToHtml(markdown) {
  const normalized = fixMarkdownBoldAfterCloseParen(markdown);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeHeadingIdsH2H3Only)
    .use(rehypeStringify)
    .process(normalized);
  return String(file);
}
