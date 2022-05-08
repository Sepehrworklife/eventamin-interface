import useTranslation from "next-translate/useTranslation";
import React from "react";
import Head from 'next/head';
import { DirectoryHero } from "../components/layouts/hero/directory";
import MainNavbar from "../components/layouts/navbar/main";
import { FooterOne } from "../components/layouts/footer/one";
import { CtaRegister } from "../components/layouts/section/cta-register";
import useDarkMode from "use-dark-mode";
import {FeaturesSection} from "../components/layouts/section/features";
import {Tools} from "../components/layouts/section/tools";
import {grey} from "@mui/material/colors";
import {Benefits} from "../components/layouts/section/benefits";
import {Grow} from "../components/layouts/section/grow";
import {BuyersVsProviders} from "../components/layouts/section/buyers-vs-providers";
import {JoinMember} from "../components/layouts/section/join-member";

const Directory = () => {
	const { t, lang } = useTranslation("directory");
	const { value: isDark } = useDarkMode();

	// initial States
	const [firstBgColor, setFirstBgColor] = React.useState(null);

	React.useEffect(() => {

		isDark ? setFirstBgColor(grey[900]) : setFirstBgColor(grey[200]);
		return () => {};
	}, [isDark]);

	return (
		<>
			<Head>
				<title>{t("head:directory.title")}</title>
				<meta name="description" content={t("head:directory.description")}/>
				<meta name="keywords" content={t("head:directory.keywords")}/>
			</Head>
			<MainNavbar />
			<DirectoryHero head={t("hero.head")} subHead={t("hero.sub_head")} />
			<FeaturesSection />
			<Tools bgColor={firstBgColor}/>
			<CtaRegister />
			<Benefits />
			<BuyersVsProviders bgColor={firstBgColor}/>
			<Grow />
			<JoinMember bgColor={firstBgColor} />
			<FooterOne />
		</>
	);
};

export default Directory;
