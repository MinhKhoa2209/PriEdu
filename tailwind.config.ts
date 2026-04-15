import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#fcf8ff",
        foreground: "#1b1b24",
        primary: {
          DEFAULT: "#3525cd",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1b6b4f",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ba1a1a",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Stitch Warm Theme Palette
        "tertiary-fixed-dim": "#e2c62d",
        "on-tertiary-fixed-variant": "#524600",
        "outline-variant": "#c7c4d8",
        "secondary-fixed-dim": "#8bd6b4",
        "surface-container-lowest": "#ffffff",
        "tertiary": "#6d5e00",
        "primary-fixed": "#e2dfff",
        "primary-container": "#4f46e5",
        "on-error-container": "#93000a",
        "error": "#ba1a1a",
        "tertiary-container": "#c4aa01",
        "surface-container-high": "#eae6f4",
        "secondary-fixed": "#a6f2cf",
        "inverse-on-surface": "#f3effc",
        "surface-bright": "#fcf8ff",
        "surface-container": "#f0ecf9",
        "on-surface": "#1b1b24",
        "on-primary-container": "#dad7ff",
        "inverse-surface": "#302f39",
        "surface-container-low": "#f5f2ff",
        "on-primary-fixed-variant": "#3323cc",
        "surface-tint": "#4d44e3",
        "on-tertiary-container": "#4a3f00",
        "on-background": "#1b1b24",
        "secondary-container": "#a6f2cf",
        "primary-fixed-dim": "#c3c0ff",
        "on-error": "#ffffff",
        "on-surface-variant": "#464555",
        "on-primary": "#ffffff",
        "surface-variant": "#e4e1ee",
        "on-secondary-container": "#247155",
        "error-container": "#ffdad6",
        "on-primary-fixed": "#0f0069",
        "outline": "#777587",
        "surface": "#fcf8ff",
        "tertiary-fixed": "#ffe24c",
        "on-tertiary-fixed": "#211b00",
        "on-secondary-fixed": "#002115",
        "on-secondary-fixed-variant": "#00513a",
        "inverse-primary": "#c3c0ff",
        "surface-container-highest": "#e4e1ee",
        "surface-dim": "#dcd8e5"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        headline: ["var(--font-plus-jakarta)"],
        body: ["var(--font-be-vietnam)"],
        label: ["var(--font-plus-jakarta)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
