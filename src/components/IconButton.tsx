import { cloneElement, MouseEventHandler, ReactElement } from "react";
import Ripples from "react-ripples";

interface IconButtonProps {
  icon: ReactElement;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function IconButton({
  icon,
  label,
  onClick,
  disabled,
}: IconButtonProps) {
  return (
    <Ripples
      className="h-10 w-10 rounded-full"
      during={400}
      color={disabled ? "rgba(0,0,0,0)" : "rgba(0,0,0,.3)"}
    >
      <button
        className={`group-scoped h-10 w-10 rounded-full transition-all ${
          disabled ? "" : "hover:bg-black/[.05]"
        }`}
        onClick={onClick}
        disabled={disabled || false}
        title={label}
      >
        {cloneElement(icon, {
          className: `m-2 stroke-transparent stroke-0 transition-all ${
            disabled
              ? "opacity-30"
              : "[.group-scoped:hover_&]:stroke-black [.group-scoped:hover_&]:stroke-[0.6px]"
          } ${icon.props.className}`,
        })}
      </button>
    </Ripples>
  );
}
