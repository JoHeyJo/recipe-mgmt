import { useEffect, useState } from "react";

export default function ToggleThemeSwitch() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    ).matches;
    const next = saved ? saved === "dark" : prefersDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <label className="relative inline-block">
      {/* Hidden checkbox drives peer-based styles */}
      <input
        type="checkbox"
        role="switch"
        aria-label="Dark Mode"
        checked={isDark}
        onChange={toggle}
        className="peer sr-only"
      />

      {/* Track */}
      <span
        className={[
          "block h-6 w-12 rounded-full",
          "transition-colors duration-300 [transition-timing-function:var(--timing)]",
          // light track
          "bg-[hsl(210,90%,70%)]",
          // dark track
          "peer-checked:bg-[hsl(290,90%,40%)]",
          // focus ring
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
          "peer-focus-visible:outline-[hsl(223,90%,50%)]",
          // subtle outer shadow
          "shadow-[0.125rem_0.125rem_0.25rem_rgba(0,0,0,0.2)]",
          // gradient glow overlay (pseudo via before)
          "relative before:content-[''] before:absolute before:inset-0 before:rounded-full",
          "before:bg-[hsl(50,90%,50%)]",
          "peer-checked:before:bg-[hsl(220,90%,40%)]",
          // mask to create the angled glow fade
          "before:[mask-image:linear-gradient(120deg,#000_20%,transparent_80%)]",
          "before:[-webkit-mask-image:linear-gradient(120deg,#000_20%,transparent_80%)]",
          "before:transition-colors before:duration-300",
          "before:[transition-timing-function:var(--timing)]",
        ].join(" ")}
      />

      {/* Thumb */}
      <span
        className={`absolute left-0.5 top-0.5 w-5 h-5 ${isDark ? "bg-black" : "bg-white"} rounded-full transition-transform peer-checked:translate-x-6 flex items-center justify-center text-xs`}
      >
        {isDark ? "🌙" : "☀️"}
      </span>

      {/* SR-only text */}
      <span className="sr-only">Dark Mode</span>
    </label>
  );
}
