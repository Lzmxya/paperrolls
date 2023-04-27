import type { Config } from "tailwindcss";
import pluginHeadlessui from "@headlessui/tailwindcss";
import pluginRadix from "tailwindcss-radix";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "toast-slide-in-bottom": {
          "0%": { transform: `translateY(calc(100% + 1rem))` },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "toast-slide-in-bottom":
          "toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [pluginHeadlessui, pluginRadix],
} satisfies Config;
