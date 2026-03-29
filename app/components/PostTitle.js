/**
 * 제목 문자열의 `**…**` 구간을 `<strong>`으로 렌더한다.
 * @param {{ title: string; as?: keyof import("react").JSX.IntrinsicElements; className?: string }} props
 */
export default function PostTitle({
  title,
  as: Tag = "span",
  className = "",
}) {
  const t = title ?? "";
  const segments = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(t)) !== null) {
    if (m.index > last) {
      segments.push({ bold: false, text: t.slice(last, m.index) });
    }
    segments.push({ bold: true, text: m[1] });
    last = m.index + m[0].length;
  }
  if (last < t.length) {
    segments.push({ bold: false, text: t.slice(last) });
  }
  if (segments.length === 0) {
    segments.push({ bold: false, text: t });
  }

  return (
    <Tag className={className}>
      {segments.map((seg, i) =>
        seg.bold ? (
          <strong key={i}>{seg.text}</strong>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </Tag>
  );
}
