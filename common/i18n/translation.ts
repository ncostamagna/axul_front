import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getTranslations = async (locale?: string): Promise<SSRConfig> => {
  let translations: SSRConfig;

  try {
    translations = await serverSideTranslations(locale || "en", ["main"]);
  } catch (error) {
    translations = await serverSideTranslations("en", ["main"]);
  }

  return translations;
};
