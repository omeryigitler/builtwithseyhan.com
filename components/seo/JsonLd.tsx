/**
 * Inline JSON-LD structured data. Server-rendered; safe because the payload is
 * our own serialized object (no user HTML). Use builders in lib/seo to construct
 * the `data` object.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
