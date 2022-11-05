import { cloneElement, MouseEventHandler, ReactElement } from "react";
import Ripples from "react-ripples";

interface IconButtonProps {
  className?: string;
  disabled?: boolean;
  icon: ReactElement;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton({
  className,
  disabled,
  icon,
  label,
  onClick,
}: IconButtonProps) {
  return (
    <Ripples
      className={`h-10 w-10 rounded-full ${className}`}
      during={400}
      color={disabled ? "rgba(0,0,0,0)" : "rgba(0,0,0,.3)"}
    >
      <button
        type="button"
        className={`group/icon h-10 w-10 rounded-full transition-all ${
          !disabled && "hover:bg-black/10 dark:hover:bg-white/25"
        }`}
        onClick={onClick}
        disabled={disabled || false}
        title={label}
      >
        {cloneElement(icon, {
          className: `dark:fill-current m-2 stroke-current stroke-0 transition-all ${
            disabled ? "opacity-30" : "group-hover/icon:stroke-[0.6px]"
          } ${icon.props.className}`,
        })}
      </button>
    </Ripples>
  );
}
