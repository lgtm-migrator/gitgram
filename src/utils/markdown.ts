import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import sanitize from "sanitize-html";
import { unified } from "unified";
import { trimHtml } from "./validateHtml";

/**
 * Converts markdown to html with convinience!💃💃
 * @param {String} payload dirty markdown
 * @returns {String} sanitized html
 */
export function markdownToHTML(payload: string): string {
  // Blazing quick return if the payload is an empty
  // string or any other types which I don't know.
  if (!payload) return "";

  const html = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml)
    .processSync(payload).toString("utf-8");
  const trimmedHtml = trimHtml(100, html);
  const sanitized = sanitize(trimmedHtml,
    {
      allowedTags: ["a",
        "b",
        "i",
        "s",
        "u",
        "em",
        "strong",
        "strike",
        "del",
        "code",
        "pre",
        "br"],
      allowedAttributes: {"a": ["href"] }
    });
    
  return sanitized;
}
