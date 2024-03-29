import { NavLink, useLocation } from "react-router-dom";
import Ripples from "react-ripples";

import FloatingActionButton from "@/components/FloatingActionButton";
import { ReactComponent as IconInbox } from "@/assets/images/icons/inbox.svg";
import { ReactComponent as IconInsights } from "@/assets/images/icons/pie-chart.svg";
// import { ReactComponent as IconMap } from "@/assets/images/icons/map.svg";

const destinations = [
  { label: "票匣", path: "inbox", icon: <IconInbox /> },
  { label: "洞悉", path: "insights", icon: <IconInsights /> },
  // { label: "地圖", path: "map", icon: <IconMap /> },
];

export default function Navigation() {
  const { search } = useLocation();

  return (
    <nav className="fixed bottom-0 z-10 w-full shrink-0 bg-blue-50 transition-all dark:bg-neutral-800 md:static md:w-20 md:bg-transparent md:dark:bg-transparent">
      <div className="my-7 hidden justify-center md:flex">
        <FloatingActionButton />
      </div>
      <ul className="my-3 flex justify-evenly gap-3 md:mt-5 md:flex-col">
        {destinations.map(({ icon, label, path }) => (
          <li key={path} className="flex h-14 items-center justify-center">
            <Ripples className="rounded-full">
              <NavLink
                to={`${path}${search}`}
                end={path === "/"}
                className="group p-2"
              >
                {({ isActive }) => (
                  <>
                    <div className="relative my-1 flex h-8 w-14">
                      <div
                        className={`absolute h-full w-full rounded-full transition-all ${
                          isActive
                            ? "bg-blue-200 group-hover:bg-blue-300 group-focus:bg-blue-300 dark:bg-blue-400/50 dark:group-hover:bg-blue-300/50 dark:group-focus:bg-blue-300/50"
                            : "group-hover:bg-black/10 group-focus:bg-black/10 dark:group-hover:bg-white/25 dark:group-focus:bg-white/25"
                        }`}
                      ></div>
                      <div className="relative m-auto fill-current stroke-current stroke-0 transition-all group-hover:stroke-[0.4px]">
                        {icon}
                      </div>
                    </div>
                    <div className="text-center text-xs">{label}</div>
                  </>
                )}
              </NavLink>
            </Ripples>
          </li>
        ))}
      </ul>
    </nav>
  );
}
