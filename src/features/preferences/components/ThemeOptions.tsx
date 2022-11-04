import { RadioGroup } from "@headlessui/react";

import { useTheme } from "@/app/contexts/theme";

import SegmentedButtons from "@/components/SegmentedButtons";
import { ReactComponent as IconDarkTheme } from "@/assets/images/icons/dark-mode.svg";
import { ReactComponent as IconLightTheme } from "@/assets/images/icons/light-mode.svg";
import { ReactComponent as IconSystemTheme } from "@/assets/images/icons/routine.svg";

const themes = [
  {
    name: "light",
    title: "淺色",
    icon: <IconLightTheme />,
  },
  {
    name: "dark",
    title: "深色",
    icon: <IconDarkTheme />,
  },
  {
    name: "system",
    title: "遵循系統",
    icon: <IconSystemTheme />,
  },
];

export function ThemeOptions() {
  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup
      value={theme}
      onChange={setTheme}
      className="flex items-center justify-between gap-6 px-3"
    >
      <RadioGroup.Label>主題</RadioGroup.Label>
      <SegmentedButtons options={themes} />
    </RadioGroup>
  );
}
