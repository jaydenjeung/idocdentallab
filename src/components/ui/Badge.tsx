import { ReactNode } from "react";

type Variant = "primary" | "light" | "dark" | "neutral";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-green-700 text-white",
  light:   "bg-green-50 text-green-700 border border-green-200",
  dark:    "bg-green-900 text-green-200",
  neutral: "bg-surface-2 text-ink-3",
};

export default function Badge({ children, variant = "light", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
