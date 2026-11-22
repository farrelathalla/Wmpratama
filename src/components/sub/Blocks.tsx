import type { Block } from "@/lib/content";

const isHeading = (b: Block) => b.type === "h" || (b.type === "p" && !!b.text && b.text.length < 60 && b.text.endsWith("?"));

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="blocks">
      {blocks.map((b, i) => {
        if (b.type === "list") {
          return <ul key={i}>{b.items?.map((item) => <li key={item}>{item}</li>)}</ul>;
        }
        if (isHeading(b)) return <h2 key={i}>{b.text}</h2>;
        return <p key={i}>{b.text}</p>;
      })}
    </div>
  );
}
