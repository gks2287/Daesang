import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Legacy ── */
        background: "var(--background)",
        foreground: "var(--foreground)",

        /* ── Brand (key color preserved) ── */
        brand: {
          DEFAULT: "#55A4DA",
          light: "#7BBDE4",
          dark: "#3A8BC4",
          50: "#EBF4FA",
          100: "#D1E8F5",
          200: "#A8D2EC",
          300: "#7BBDE4",
          400: "#55A4DA",
          500: "#3A8BC4",
          600: "#2D6E9E",
          700: "#225278",
          800: "#163752",
          900: "#0B1B2C",
        },

        /* ── Text (from Figma: Text Colors) ── */
        text: {
          primary: "var(--color-text-primary)",           // #323338
          secondary: "var(--color-text-secondary)",       // #676879
          disabled: "var(--color-text-disabled)",          // rgba(50,51,56,0.38)
          onBrand: "var(--color-text-on-primary)",        // #FFFFFF
          onInverted: "var(--color-text-on-inverted)",    // #FFFFFF
        },

        /* ── Backgrounds (from Figma: Backgrounds) ── */
        surface: {
          DEFAULT: "var(--color-bg-primary)",              // #FFFFFF
          secondary: "var(--color-bg-secondary)",          // #FFFFFF
          subtle: "var(--color-bg-allgrey)",               // #F6F7FB
          ui: "var(--color-bg-ui)",                        // #E7E9EF
          disabled: "var(--color-bg-disabled)",             // #ECEDF5
          inverted: "var(--color-bg-inverted)",             // #323338
          hover: "var(--color-bg-primary-hover)",           // rgba(103,104,121,0.1)
        },

        /* ── Utility (from Figma: Utility) ── */
        border: {
          DEFAULT: "var(--color-ui-border)",               // #C3C6D4
          light: "var(--color-layout-border)",             // #D0D4E4
          focus: "#55A4DA",
        },
        icon: {
          DEFAULT: "var(--color-icon)",                    // #676879
        },
        placeholder: {
          DEFAULT: "var(--color-placeholder)",             // #676879
        },
        link: {
          DEFAULT: "var(--color-link)",                    // #3A8BC4 (brand-dark)
        },
        fixed: {
          dark: "var(--color-fixed-dark)",                 // #111111
          light: "var(--color-fixed-light)",               // #FFFFFF
        },

        /* ── Status ── */
        status: {
          success: "#00B267",
          error: "#D83A52",
          warning: "#FFCB00",
          info: "#55A4DA",
        },
      },
      fontFamily: {
        sans: ["Figtree", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        h1: ["24px", { lineHeight: "32px", fontWeight: "700" }],
        h2: ["18px", { lineHeight: "24px", fontWeight: "600" }],
        h3: ["16px", { lineHeight: "22px", fontWeight: "600" }],
        text1: ["16px", { lineHeight: "22px", fontWeight: "400" }],
        "text1-medium": ["16px", { lineHeight: "22px", fontWeight: "600" }],
        text2: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "text2-medium": ["14px", { lineHeight: "20px", fontWeight: "600" }],
        text3: ["12px", { lineHeight: "16px", fontWeight: "400" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        full: "100px",
      },
      boxShadow: {
        xs: "0px 4px 6px -4px rgba(0, 0, 0, 0.1)",
        sm: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        md: "0px 6px 20px 0px rgba(0, 0, 0, 0.2)",
        lg: "0px 15px 50px 0px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
