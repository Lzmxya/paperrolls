import NavigationPill from "./NavigationPill";
import iconInbox from "@/assets/images/ic-inbox.svg";
import iconStats from "@/assets/images/ic-stats.svg";
import iconMap from "@/assets/images/ic-map.svg";

export default function Aside() {
  return (
    <aside className="w-20">
      {/* <button className="h-14 min-w-[3.5rem] rounded-2xl bg-blue-300 p-4 hover:shadow-lg">
        +
        <span className="ml-4 hidden whitespace-nowrap group-hover:inline">
          新增發票
        </span>
      </button> */}
      <nav>
        <ul className="mt-5 flex flex-col gap-3">
          <NavigationPill path="/" label="票匣" icon={iconInbox} />
          <NavigationPill path="stats" label="統計" icon={iconStats} />
          <NavigationPill path="map" label="地圖" icon={iconMap} />
        </ul>
      </nav>
    </aside>
  );
}
