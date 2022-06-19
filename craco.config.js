module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss")("./src/css/tailwind.config.js"),
        require("autoprefixer"),
      ],
    },
  },
  babel: {
    plugins: ["@babel/plugin-proposal-nullish-coalescing-operator"],
  },
};
