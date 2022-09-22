import { NavLink } from "react-router-dom";

interface NavigationPillProps {
  path: string;
  label: string;
  icon: string;
  // tip: string;
}

export default function NavigationPill({
  path,
  label,
  icon,
}: NavigationPillProps) {
  return (
    <li className="group flex h-14 items-center justify-center">
      <NavLink to={path} end={path === "/"}>
        {({ isActive }) => (
          <>
            <div className="relative my-1 flex h-8 w-14">
              <div
                className={`absolute h-full w-full rounded-full transition-all ${
                  isActive ? "bg-blue-200" : "group-hover:bg-gray-200"
                }`}
              ></div>
              <div className="relative m-auto">
                <img
                  className="w-7 transition-all group-hover:w-8"
                  src={icon}
                  alt={label}
                  title={label}
                />
              </div>
            </div>
            <p className="text-center text-xs">{label}</p>
          </>
        )}
      </NavLink>
    </li>
  );
}
