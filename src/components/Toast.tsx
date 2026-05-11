import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", duration = 3000) => {
      const id = Math.random().toString(36).substring(7);
      const toast: Toast = { id, message, type, duration };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: -20, x: 20 },
        { opacity: 1, y: 0, x: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  const icons = {
    success: <CheckCircle size={20} className="text-emerald" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    info: <Info size={20} className="text-blue-500" />,
  };

  const bgColors = {
    success: "bg-emerald/10 border-emerald/30",
    error: "bg-red-500/10 border-red-500/30",
    info: "bg-blue-500/10 border-blue-500/30",
  };

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${bgColors[toast.type]} backdrop-blur-sm`}
    >
      {icons[toast.type]}
      <p className="flex-1 font-sans-body text-sm text-charcoal">
        {toast.message}
      </p>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 text-charcoal/50 hover:text-charcoal transition-colors"
        aria-label="Dismiss"
      >
        <X size={18} />
      </button>
    </div>
  );
}

function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: Toast[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
}
