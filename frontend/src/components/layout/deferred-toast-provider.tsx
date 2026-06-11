"use client";

import { useEffect, useState } from "react";

type ToasterComponent = typeof import("sonner").Toaster;

const toastClassNames = {
  toast:
    "!bg-surface-glass !border-border-glass !backdrop-blur-md !rounded-xl !shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)]",
  title: "!text-text !font-semibold !text-[13px]",
  description: "!text-text-muted !text-[12px] !leading-relaxed",
  actionButton: "!bg-primary !text-bg !text-[12px] !font-semibold !rounded-md hover:!bg-primary-hover",
  closeButton: "!bg-surface-2 !border-border !text-text-muted hover:!text-text",
};

export function DeferredToastProvider() {
  const [Toaster, setToaster] = useState<ToasterComponent | null>(null);

  useEffect(() => {
    let mounted = true;

    void import("sonner").then((module) => {
      if (mounted) {
        setToaster(() => module.Toaster);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!Toaster) return null;

  return (
    <Toaster
      theme="dark"
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        classNames: toastClassNames,
      }}
    />
  );
}
