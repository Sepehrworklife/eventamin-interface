import React from "react";
import { Button } from "@mui/material";
import Head from "next/head";
import MainNavbar from "../components/layouts/navbar/main";
import { Hero } from "../components/layouts/hero/main";
import { SectionOne } from "../components/layouts/section/one";
import { SectionTwo } from "../components/layouts/section/two";
import { FooterOne } from "../components/layouts/footer/one";
import { CtaRegister } from "../components/layouts/section/cta-register";
import { Grow } from "../components/layouts/section/grow";
import useDarkMode from "use-dark-mode";
import { grey } from "@mui/material/colors";
import { BuyersVsProviders } from "../components/layouts/section/buyers-vs-providers";
import useTranslation from "next-translate/useTranslation";
import { StatCounter } from "../components/layouts/counter/stat-counter";
import ExhibitionIntroduction from "../components/layouts/exhibition/exhibition";
import Sponsors from "../components/layouts/section/sponsors/sponsors";

export default function Home() {
  const { value: isDark } = useDarkMode();
  const { t } = useTranslation();

  // initial States
  const [firstBgColor, setFirstBgColor] = React.useState(null);

  React.useEffect(() => {
    isDark ? setFirstBgColor(grey[900]) : setFirstBgColor(grey[200]);
    return () => {};
  }, [isDark]);

  return (
    <>
      <Head>
        <title>{t("head:home.title")}</title>
        <meta name="description" content={t("head:home.description")} />
        <meta name="keywords" content={t("head:home.keywords")} />
      </Head>
      <MainNavbar />
      <Hero />
			<Sponsors />
      <SectionOne />
      <CtaRegister />
      <SectionTwo />
      <StatCounter />
      <Grow />
      <BuyersVsProviders bgColor={firstBgColor} />
      <ExhibitionIntroduction />
      <FooterOne />
    </>
  );
}
