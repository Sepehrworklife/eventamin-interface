import { grey } from "@mui/material/colors";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import useDarkMode from "use-dark-mode";
import { SecondaryHero } from "../components/layouts/hero/secondary";
import MainNavbar from "../components/layouts/navbar/main";
import { SectionThree } from "../components/layouts/section/three";
import { SectionWithButtons } from "../components/layouts/section/with-buttons";
import { FooterOne } from "../components/layouts/footer/one";
import { CtaRegister } from "../components/layouts/section/cta-register";
import Head from 'next/head';

const About = () => {
	const { t, lang } = useTranslation("about");
	const { value: isDark } = useDarkMode();

	// Initial states
	const [firstBgColor, setFirstBgColor] = React.useState(null);

	React.useEffect(() => {
		isDark ? setFirstBgColor(grey[900]) : setFirstBgColor(grey[200]);
	});

	return (
		<>
			<Head>
				<title>{t("head:about.title")}</title>
				<meta name="description" content={t("head:about.description")}/>
				<meta name="keywords" content={t("head:about.keywords")}/>
			</Head>
			<MainNavbar />
			<SecondaryHero subHead={t("hero.sub_head")} head={t("hero.head")} />
			<SectionThree
				title={t("section_one.title")}
				description={t("section_one.description")}
			/>
			<SectionWithButtons
				title={t("second_section.title")}
				description={t("second_section.description")}
				bgColor={firstBgColor}
				firstLink="/directory"
				secondLink="/register"
				firstButtonText={t("second_section.register_button_text")}
				secondButtonText={t("second_section.second_button_text")}
			/>
			<CtaRegister />

			<FooterOne />
		</>
	);
};

export default About;
