import "../styles/global.scss";
import Script from "next/script";
import NextNprogress from "nextjs-progressbar";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import Authenticate from "../utils/authenticate";
import { ThemeProvider } from "@mui/material/styles";
import useDarkMode from "use-dark-mode";
import {
	DarkTheme,
	LightTheme,
	RtlDarkTheme,
	RtlLightTheme,
} from "../components/modules/theme-modes";
import { CssBaseline } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import RFPProvider from "../contexts/app-rfp-provider";
import Head from "next/head";

// _app.js

const MyApp = ({ Component, pageProps }) => {
	const { t, lang } = useTranslation();
	const [activeTheme, setActiveTheme] = React.useState(LightTheme);
	const auth = new Authenticate();
	const { value: isDark, toggle: toggleDarkMode } = useDarkMode(false);
	const { rfp, setRfp } = React.useState([]);

	// Create rtl cache
	const cacheRtl = createCache({
		key: "muirtl",
		stylisPlugins: [rtlPlugin],
	});

	React.useEffect(() => {
		auth.tokenExpire();
		if (lang === "fa") {
			document.body.setAttribute("dir", "rtl");
			isDark ? setActiveTheme(RtlDarkTheme) : setActiveTheme(RtlLightTheme);
		} else {
			isDark ? setActiveTheme(DarkTheme) : setActiveTheme(LightTheme);
			document.body.setAttribute("dir", "ltr");
		}
	}, [isDark, lang]);

	if (lang === "fa")
		return (
			<>
				<CacheProvider value={cacheRtl}>
					<ThemeProvider theme={activeTheme}>
						<RFPProvider>
							<NextNprogress
								color="#29D"
								startPosition={0.3}
								stopDelayMs={200}
								height={8}
								showOnShallow={true}
							/>
							<CssBaseline />
							<Script
								strategy="lazyOnload"
								src="https://www.googletagmanager.com/gtag/js?id=G-CRDYPGD89B"
							></Script>
							<Script id="google-analytics" strategy="lazyOnload">
								{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CRDYPGD89B');
	`}
							</Script>
							<Component {...pageProps} />
						</RFPProvider>
					</ThemeProvider>
				</CacheProvider>
			</>
		);

	return (
		<>
			<ThemeProvider theme={activeTheme}>
				<RFPProvider>
					<NextNprogress
						color="#29D"
						startPosition={0.3}
						stopDelayMs={200}
						height={8}
						showOnShallow={true}
					/>

					<CssBaseline />
					<Script
						strategy="lazyOnload"
						src="https://www.googletagmanager.com/gtag/js?id=G-CRDYPGD89B"
					></Script>
					<Script id="google-analytics" strategy="lazyOnload">
						{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CRDYPGD89B');
	`}
					</Script>
					<Component {...pageProps} rfp={rfp} setRfp={setRfp} />
				</RFPProvider>
			</ThemeProvider>
		</>
	);
};
export default MyApp;
