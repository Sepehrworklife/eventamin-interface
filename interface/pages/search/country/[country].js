import { useRouter } from "next/router";
import React from "react";
import MainNavbar from "../../../components/layouts/navbar/main";
import { DirectoryHero } from "../../../components/layouts/hero/directory";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { Container, Fab, Grid, Hidden, Typography } from "@mui/material";
import SearchResults from "../../../components/modules/search/results";
import { FooterOne } from "../../../components/layouts/footer/one";
import RequestForProposal from "../../../components/modules/request-for-proposal";
import { CountryDetector } from "../../../utils/country";
import {Project as ProjectRequest} from "../../../components/modules/requests/project";
import {General as GeneralRequest} from '../../../components/modules/requests/general';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const Country = (props) => {
	// Hooks
	const { t, lang } = useTranslation("search");
	const router = useRouter();
	const rfpRef = React.useRef(null);

	// Initial States
	const [projectModal, setProjectModal] = React.useState(false);
	const [generalModal, setGeneralModal] = React.useState(false);

	// Country Title
	const CountryName = CountryDetector(router.query.country.toUpperCase(), lang);

	function handleModalClose() {
		setProjectModal(false);
		setGeneralModal(false);
	}
	function handleClick() {
		scrollToRef(rfpRef);
	}

	return (
		<>
			<Head>
				<title>{t("head:search.country.title")}</title>
				<meta name="description" content={t("head:search.country.description")}/>
				<meta name="keywords" content={t("head:search.country.keywords")}/>
			</Head>
			
			<MainNavbar />
			<DirectoryHero
				head={t("company.hero.head")}
				subHead={t("company.hero.sub_head")}
			/>
			<Container maxWidth="lg" sx={{ my: 5 }}>
				<Typography
					variant="h5"
					fontWeight="600"
					component="h2"
					marginBottom={3}
				>
					{CountryName}
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={8} lg={9}>
						<SearchResults query={router.query.country} basedBy="country" />
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<RequestForProposal accRef={rfpRef} setProjectModal={setProjectModal} setGeneralModal={setGeneralModal}/>
						{projectModal && 
						<ProjectRequest
							modal={projectModal}
							handleModalClose={handleModalClose}
						/>
							}
						{generalModal &&<GeneralRequest
							modal={generalModal}
							handleModalClose={handleModalClose}
						/>
							}
					</Grid>
				</Grid>
			</Container>
			<FooterOne />
			<Hidden mdUp>
				<Fab
					color="primary"
					sx={{ position: "fixed", bottom: 20, left: 20 }}
					onClick={handleClick}
				>
					RFP's
				</Fab>
			</Hidden>
		</>
	);
};

export default Country;
