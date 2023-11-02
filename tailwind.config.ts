import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      gridTemplateRows: {
        "11": "repeat(11, minmax(0, 1fr))",
        "main-horizontal": "auto 20rem",
      },
      gridTemplateColumns: {
        "main-vertical": "6rem auto",
      },
    },
  },
  plugins: [],
} satisfies Config;
