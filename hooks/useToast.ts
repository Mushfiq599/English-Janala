import { useState, useCallback } from "react";

interface ToastMessage {
    id: string;
    message: string;
    type: "success" | "error";
}

export function useToast() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback(
        (message: string, type: "success" | "error" = "success") => {
            const id = Math.random().toString(36).slice(2);
            setToasts((prev) => [...prev, { id, message, type }]);
        },
        []
    );

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { toasts, addToast, removeToast };
}