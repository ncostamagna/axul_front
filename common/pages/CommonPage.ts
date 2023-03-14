import { GetStaticProps, GetStaticPaths } from "next";
import { getTranslations } from "common/i18n/translation";

export const commonGetStaticProps: GetStaticProps = async ({
  params,
  locale,
}) => {
  const translations = await getTranslations(locale);

  return {
    props: {
      ...translations,
    },
  };
};

export const commonGetStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  return {
    paths,
    fallback: "blocking",
  };
};
