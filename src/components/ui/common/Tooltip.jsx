import { useState, useRef, useEffect, cloneElement, Children } from "react";

/**
 * Tooltip
 * -------
 * Props:
 *   content      string | ReactNode  — the tooltip body (required)
 *   side         'top' | 'right' | 'bottom' | 'left'   (default: 'top')
 *   align        'start' | 'center' | 'end'            (default: 'center')
 *   delay        number (ms) before showing            (default: 150)
 *   offset       number (px) gap between trigger/tip   (default: 8)
 *   disabled     boolean                               (default: false)
 *   className    extra classes for the tooltip bubble
 *   children     a single focusable/hoverable element (required)
 *
 * Usage:
 *   <Tooltip content="Copy to clipboard" side="top">
 *     <button className="...">Copy</button>
 *   </Tooltip>
 */
export default function Tooltip({
  content,
  side = "top",
  align = "center",
  delay = 150,
  offset = 8,
  disabled = false,
  className = "",
  children,
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef(null);
  const timerRef = useRef(null);
  const id = useRef(
    `tt-${Math.random().toString(36).slice(2, 9)}`
  ).current;

  // Mount/unmount with a slight delay so the exit animation can play
  useEffect(() => {
    if (open) {
      setMounted(true);
    } else if (mounted) {
      const t = setTimeout(() => setMounted(false), 120);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  const show = () => {
    if (disabled || !content) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    clearTimeout(timerRef.current);
    setOpen(false);
  };

  // Dismiss on Escape for accessibility
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") hide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Cleanup timer on unmount
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const child = Children.only(children);
  const trigger = cloneElement(child, {
    ref: (node) => {
      triggerRef.current = node;
      const { ref } = child;
      if (typeof ref === "function") ref(node);
      else if (ref && "current" in ref) ref.current = node;
    },
    onMouseEnter: (e) => {
      show();
      child.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e) => {
      hide();
      child.props.onMouseLeave?.(e);
    },
    onFocus: (e) => {
      show();
      child.props.onFocus?.(e);
    },
    onBlur: (e) => {
      hide();
      child.props.onBlur?.(e);
    },
    "aria-describedby": open ? id : child.props["aria-describedby"],
  });

  const positionClasses = getPositionClasses(side, align, offset);
  const arrowClasses = getArrowClasses(side, align);
  const animClasses = open
    ? "opacity-100 scale-100"
    : "opacity-0 scale-95 pointer-events-none";

  return (
    <span className="relative inline-flex">
      {trigger}
      {mounted && (
        <span
          id={id}
          role="tooltip"
          className={[
            "absolute z-50 whitespace-nowrap",
            "rounded-md px-2.5 py-1.5",
            "text-xs font-medium tracking-tight",
            "bg-neutral-900 text-neutral-50",
            "shadow-lg shadow-black/10 ring-1 ring-black/5",
            "transition-[opacity,transform] duration-150 ease-out origin-center",
            "dark:bg-neutral-100 dark:text-neutral-900 dark:ring-white/10",
            positionClasses,
            animClasses,
            className,
          ].join(" ")}
        >
          {content}
          <span
            aria-hidden="true"
            className={[
              "absolute h-2 w-2 rotate-45",
              "bg-neutral-900 dark:bg-neutral-100",
              arrowClasses,
            ].join(" ")}
          />
        </span>
      )}
    </span>
  );
}

/* ---------- positioning helpers ---------- */

function getPositionClasses(side, align, offset) {
  const gap = `${offset}px`;

  const sideMap = {
    top:    `bottom-full mb-[${gap}]`,
    bottom: `top-full mt-[${gap}]`,
    left:   `right-full mr-[${gap}]`,
    right:  `left-full ml-[${gap}]`,
  };

  const alignMap = {
    top: {
      start:  "left-0",
      center: "left-1/2 -translate-x-1/2",
      end:    "right-0",
    },
    bottom: {
      start:  "left-0",
      center: "left-1/2 -translate-x-1/2",
      end:    "right-0",
    },
    left: {
      start:  "top-0",
      center: "top-1/2 -translate-y-1/2",
      end:    "bottom-0",
    },
    right: {
      start:  "top-0",
      center: "top-1/2 -translate-y-1/2",
      end:    "bottom-0",
    },
  };

  return `${sideMap[side]} ${alignMap[side][align]}`;
}

function getArrowClasses(side, align) {
  const sideMap = {
    top:    "bottom-[-3px]",
    bottom: "top-[-3px]",
    left:   "right-[-3px]",
    right:  "left-[-3px]",
  };

  const alignMap = {
    top: {
      start:  "left-3",
      center: "left-1/2 -translate-x-1/2",
      end:    "right-3",
    },
    bottom: {
      start:  "left-3",
      center: "left-1/2 -translate-x-1/2",
      end:    "right-3",
    },
    left: {
      start:  "top-3",
      center: "top-1/2 -translate-y-1/2",
      end:    "bottom-3",
    },
    right: {
      start:  "top-3",
      center: "top-1/2 -translate-y-1/2",
      end:    "bottom-3",
    },
  };

  return `${sideMap[side]} ${alignMap[side][align]}`;
}
