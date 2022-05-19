import { Container, Typography, Grid, LinearProgress } from "@mui/material";
import Head from "next/head";
import React from "react";
import MainNavbar from "../components/layouts/navbar/main";
import { FooterOne } from "../components/layouts/footer/one";
import RequestForProposal from "../components/modules/request-for-proposal";
import { Project as ProjectRequest } from "../components/modules/requests/project";
import { General as GeneralRequest } from "../components/modules/requests/general";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import {SearchResults} from '../components/modules/products/search-results';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const Products = () => {
	// Hooks
	const { t, lang } = useTranslation("products");
	const [isLoading, setIsLoading] = React.useState(true);
	const router = useRouter();
	const rfpRef = React.useRef(null);
	

	// Initial Stataes
	const [projectModal, setProjectModal] = React.useState(false);
	const [generalModal, setGeneralModal] = React.useState(false);

	function handleModalClose() {
		setProjectModal(false);
		setGeneralModal(false);
	}

	return (
		<>

			<Head>
				<title>{t("head:products.title")}</title>
				<meta name="description" content={t("head:products.description")}/>
				<meta name="keywords" content={t("head:products.keywords")}/>
			</Head>
		
			<MainNavbar />
			<Container maxWidth="lg" sx={{ my: 5 }}>
				<Typography
					variant="h5"
					fontWeight="600"
					component="h2"
					marginBottom={3}
				></Typography>
				<Grid container spacing={2}>
					<SearchResults />
					<Grid item xs={12} md={4} lg={3}>
						<RequestForProposal
							accRef={rfpRef}
							setProjectModal={setProjectModal}
							setGeneralModal={setGeneralModal}
						/>
						{projectModal && (
							<ProjectRequest
								modal={projectModal}
								handleModalClose={handleModalClose}
							/>
						)}
						{generalModal && (
							<GeneralRequest
								modal={generalModal}
								handleModalClose={handleModalClose}
							/>
						)}
					</Grid>
				</Grid>
			</Container>
			<FooterOne />
		</>
	);
};

export default Products;
