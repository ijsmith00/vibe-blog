/**
 * JSON-LD를 `<script type="application/ld+json">`으로 삽입하는 범용 컴포넌트
 * @param {{ data: Record<string, unknown> }} props
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
