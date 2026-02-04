"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--card)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "0.5rem",
        },
        success: {
          style: {
            background: "var(--success)",
            color: "white",
          },
        },
        error: {
          style: {
            background: "var(--error)",
            color: "white",
          },
        },
      }}
    />
  );
}
