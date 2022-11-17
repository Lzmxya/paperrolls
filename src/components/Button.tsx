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
      className={`h-10 rounded-full px-3 text-blue-600 transition-all dark:text-blue-300 ${
        disabled
          ? "opacity-40"
          : filled
          ? "bg-blue-200 text-inherit hover:bg-blue-300 active:bg-blue-400 dark:bg-blue-400/50 dark:text-inherit dark:hover:bg-blue-300/50 dark:active:bg-blue-200/50"
          : "hover:bg-blue-300/40 active:bg-blue-300/60 dark:hover:bg-blue-300/20 dark:active:bg-blue-300/40"
      }`}
      onClick={onClick}
      disabled={disabled || false}
      title={label}
    >
      {label}
    </button>
  );
}
