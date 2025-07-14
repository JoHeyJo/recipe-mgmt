import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function Portal({ children, portal }: { children: React.ReactNode, portal: string }) {
  const [mounted, setMounted] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById(portal);
    if (el) {
      setPortalRoot(el);
      setMounted(true);
    }
  }, []);

  if (!mounted || !portalRoot) return null;

  return createPortal(children, portalRoot);
}
