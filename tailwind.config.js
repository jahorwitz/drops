import HeadlessTailwindPlugin from "@headlessui/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    screens: { sm: "390px" },
    extend: {
      colors: {
        black: "#121212",
        white: "#FFFFFF",
        lightYellow: "#fff7cc",
        yellow: "#ffea7a",
        darkYellow: "#ffe871",
        lightGray: "#f5f5f5",
        lightBlue: "#c8e1fa",
        blue: "#64affa",
        lightPink: "#ffccd4",
        pink: "#ff8093",
        lightGreen: "#c9fbc9",
        green: "#5cd65c",
        lightPurple: "#f3d3fb",
        purple: "#e286f9",
        red: "#ff3636",
      },
      backgroundImage: (theme) => ({
        "gradient-welcome": `linear-gradient(to bottom, ${theme(
          "colors.lightYellow",
        )}, ${theme("colors.darkYellow")})`,
      }),
      fontSize: {
        "welcome-title": "44px",
        "section-header": "32px",
        "section-subtext": "20px",
        "paragraph-lg": "16px",
        "paragraph-sm": "14px",
        "caption-text": "12px",
      },
      fontFamily: {
        text: ["Rubik", "Arial", "sans"],
      },
      maxWidth: {
        pageContent: "370px",
      },
      spacing: {
        16: "60px",
      },
    },
  },
  plugins: [
    HeadlessTailwindPlugin({ prefix: "ui" }),
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};
