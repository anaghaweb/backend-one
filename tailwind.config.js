/** @type {import('tailwindcss').Config} */
const path = require("path")

const uiPath = path.resolve(
  require.resolve("@medusajs/ui"),
  "../..",
  "\*_/_.{js,jsx,ts,tsx}"
)

module.exports = {
  presets:[require("@medusajs/ui-preset")],
  content: ["./src/**/*.{html,js}",
    uiPath,
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

