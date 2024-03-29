const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
  },
  modularizeImports: {
    "@mui/material/?(((\\w*)?/?)*)": {
      transform: "@mui/material/{{ matches.[1] }}/{{member}}",
    },
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
};

module.exports = nextConfig;
