import { FiAward } from "react-icons/fi";

interface Props {
  type: "IELTS" | "TOEFL" | "Advanced";
}

export default function ScholarBadge({ type }: Props) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
      style={{
        backgroundColor: "#1e3a5f",
        color: "#60a5fa",
      }}
    >
      <FiAward size={10} />
      {type}
    </span>
  );
}