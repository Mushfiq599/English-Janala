"use client";

import { FiPrinter } from "react-icons/fi";

interface Props {
    disabled?: boolean;
}

export default function PrintButton({ disabled }: Props) {
    return (
        <button
            onClick={() => window.print()}
            disabled={disabled}
            style={{
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
                backgroundColor: "var(--bg-card)",
            }}
            className="no-print flex items-center gap-2 text-sm font-medium px-4 py-2 border rounded-lg hover:opacity-80 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
            <FiPrinter size={15} />
            Print / Export
        </button>
    );
}