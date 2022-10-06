import { useEffect, useState } from "react";
import Ripples from "react-ripples";

interface IconButtonProps {
  icon: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

interface SvgIconProps {
  fileName: string;
  className?: string;
}

/**
 * see {@link https://stackoverflow.com/a/71199308}.
 */
function SvgIcon({ fileName, className }: SvgIconProps) {
  const [element, setElement] = useState<JSX.Element | null>(null);

  useEffect(() => {
    import(`../assets/images/icons/${fileName}.svg`).then((res) => {
      const Icon = res.ReactComponent as React.ComponentType<
        JSX.IntrinsicElements["svg"]
      >;
      setElement(<Icon className={className} />);
    });
  }, [fileName, className]);

  return element;
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
        className={`group h-10 w-10 rounded-full transition-all ${
          disabled ? "" : "hover:bg-gray-100"
        }`}
        onClick={onClick}
        disabled={disabled || false}
        title={label}
      >
        <SvgIcon
          fileName={icon}
          className={`m-2 stroke-transparent stroke-0 transition-all ${
            disabled
              ? "opacity-50"
              : "group-hover:stroke-black group-hover:stroke-1"
          }`}
        />
      </button>
    </Ripples>
  );
}
