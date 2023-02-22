const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
