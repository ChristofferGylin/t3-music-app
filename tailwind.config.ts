import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    screens: {
      xs: "560px",
      // => @media (min-width: 560px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        poppins: ['"Poppins"', "cursive"],
      },
      gridTemplateRows: {
        "11": "repeat(11, minmax(0, 1fr))",
        drums: "repeat(11, 2rem)",
        keys: "repeat(96, 2rem)",
        "main-horizontal": "auto 20rem",
      },
      gridTemplateColumns: {
        "main-vertical": "6rem auto",
        projects: "auto 2.5rem",
      },
      fontSize: {
        xxs: ["10px", "14px"],
        xxxs: ["8px", "12px"],
      },
    },
  },
  plugins: [],
} satisfies Config;
