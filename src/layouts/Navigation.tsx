import NavigationPill from "@/components/NavigationPill";
import iconInbox from "@/assets/images/ic-inbox.svg";
import iconStats from "@/assets/images/ic-stats.svg";
import iconMap from "@/assets/images/ic-map.svg";

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 z-10 w-full md:static md:w-20">
      {/* <button className="h-14 min-w-[3.5rem] rounded-2xl bg-blue-300 p-4 hover:shadow-lg">
        +
        <span className="ml-4 hidden whitespace-nowrap group-hover:inline">
          新增發票
        </span>
      </button> */}
      <ul className="my-3 flex justify-evenly gap-3 md:mt-5 md:flex-col">
        <NavigationPill path="/" label="票匣" icon={iconInbox} />
        <NavigationPill path="insights" label="統計" icon={iconStats} />
        <NavigationPill path="map" label="地圖" icon={iconMap} />
      </ul>
    </nav>
  );
}
