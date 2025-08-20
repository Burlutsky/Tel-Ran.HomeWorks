import React, { useEffect, useRef, useState } from "react";
import type { ToastDetail } from "@features/ui/toast";

const EVENT_NAME = "app:toast";

const Toast: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const onToast = (e: Event) => {
      const ce = e as CustomEvent<ToastDetail>;
      const { message, timeout = 2000 } = ce.detail ?? { message: "" };
      if (!message) return;
      setMessage(message);
      setVisible(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setVisible(false), timeout);
    };
    window.addEventListener(EVENT_NAME, onToast as EventListener);
    return () => {
      window.removeEventListener(EVENT_NAME, onToast as EventListener);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={`toast ${visible ? "" : "is-hidden"}`} role="status" aria-live="polite">
      {message}
    </div>
  );
};

export default Toast;
