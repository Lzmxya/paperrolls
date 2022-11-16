import { MouseEventHandler } from "react";

interface ButtonProps {
  disabled?: boolean;
  filled?: boolean;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  disabled,
  filled,
  label,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`h-10 rounded-full px-3 transition-all ${
        filled && "bg-blue-200 dark:bg-blue-400/50"
      } ${
        disabled
          ? "opacity-40"
          : "hover:bg-blue-300 active:bg-blue-400 dark:hover:bg-blue-300/50 dark:active:bg-blue-400"
      }`}
      onClick={onClick}
      disabled={disabled || false}
      title={label}
    >
      {label}
    </button>
  );
}
