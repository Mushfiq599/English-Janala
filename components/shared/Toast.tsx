"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiAlertCircle } from "react-icons/fi";

interface ToastMessage {
    id: string;
    message: string;
    type: "success" | "error";
}

interface Props {
    toasts: ToastMessage[];
    onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: Props) {
    return (
        <div className="fixed bottom-20 right-6 z-50 flex flex-col gap-2 max-w-xs">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
                ))}
            </AnimatePresence>
        </div>
    );
}

function ToastItem({
    toast,
    onRemove,
}: {
    toast: ToastMessage;
    onRemove: (id: string) => void;
}) {
    useEffect(() => {
        const timer = setTimeout(() => onRemove(toast.id), 3000);
        return () => clearTimeout(timer);
    }, [toast.id, onRemove]);

    const isSuccess = toast.type === "success";

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.25 }}
            style={{
                backgroundColor: isSuccess ? "#f0fdf4" : "#fef2f2",
                borderColor: isSuccess ? "#86efac" : "#fca5a5",
            }}
            className="flex items-start gap-3 border rounded-xl px-4 py-3 shadow-lg"
        >
            <div className="flex-shrink-0 mt-0.5">
                {isSuccess ? (
                    <FiCheck size={16} className="text-green-500" />
                ) : (
                    <FiAlertCircle size={16} className="text-red-500" />
                )}
            </div>
            <p
                style={{ color: isSuccess ? "#15803d" : "#dc2626" }}
                className="text-sm font-medium flex-1 leading-snug"
            >
                {toast.message}
            </p>
            <button
                onClick={() => onRemove(toast.id)}
                style={{ color: isSuccess ? "#86efac" : "#fca5a5" }}
                className="hover:opacity-70 transition flex-shrink-0"
            >
                <FiX size={14} />
            </button>
        </motion.div>
    );
}