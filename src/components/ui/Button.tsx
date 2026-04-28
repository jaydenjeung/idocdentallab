import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size    = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?:    Size;
  href?:    string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const variants: Record<Variant, string> = {
  primary:   "bg-green-700 text-white hover:opacity-90",
  secondary: "border border-green-700 text-green-700 bg-transparent hover:bg-green-50",
  ghost:     "border border-surface-3 text-ink-3 bg-transparent hover:bg-surface",
  dark:      "bg-ink text-white hover:opacity-85",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
};

export default function Button({
  children,
  variant  = "primary",
  size     = "md",
  href,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const base = `inline-flex items-center justify-center rounded-full font-medium transition-all duration-150 ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
