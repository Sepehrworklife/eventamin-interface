import React from "react";
import Head from "next/head";
import MainNavbar from "../../components/layouts/navbar/main";
import { FooterOne } from "../../components/layouts/footer/one";
import {
	Button,
	Container,
	Grid,
	ButtonGroup,
	Typography,
	Divider,
	CircularProgress,
} from "@mui/material";
import { SingleNewsCard } from "../../components/modules/news/single-news.card";
import { getMultiNews } from "../../services/news";
import useTranslation from "next-translate/useTranslation";
import { Box } from "@mui/system";
const Api = require("../../constants/api.json");

const News = () => {
	// Hooks
	const { t, lang } = useTranslation('news');

	// Initial states
	const [isLoading, setIsLoading] = React.useState(false);
	const [finishNews, setFinishNews] = React.useState(false);
	const [skip, setSkip] = React.useState(0);
	const [news, setNews] = React.useState([]);
	const limit = 12;

	function handleNext() {
		setSkip(skip + limit);
	}

	function handlePrevious() {
		setFinishNews(false);
		const mth = skip - limit === 1 ? 0 : skip - limit;
		setSkip(mth);
	}

	React.useEffect(() => {
		fetchNews();
	}, [skip]);

	async function fetchNews() {
		setIsLoading(true);
		await getMultiNews(limit, skip)
			.then((response) => {
				setNews(response.data);
			})
			.catch((error) => setFinishNews(true));
		setIsLoading(false);
	}

	return (
		<>
			<Head>
				<title>{t("head:news.title")}</title>
				<meta name="description" content={t("head:news.description")}/>
				<meta name="keywords" content={t("head:news.keywords")}/>
			</Head>
			
			<MainNavbar />
			<Container maxWidth="lg" sx={{ my: 5 }}>
				<Typography
					component="p"
					variant="h4"
					fontWeight="600"
					textAlign="center"
				>
					{t("title")}
				</Typography>
				<Divider sx={{ my: 4 }} />
				{isLoading && (
					<Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
						<CircularProgress />
					</Box>
				)}
				<Grid container spacing={2}>
					{finishNews ? (
						<Typography
							component="p"
							variant="h5"
							textAlign="center"
							sx={{ my: 4 }}
						>
							{" "}
							There is no more feed.{" "}
						</Typography>
					) : (
						news.length > 0 &&
						news.map((data, index) => {
							if(!data.status) return;
							return (
								<Grid item key={index} xs={1} sm={2} md={4} lg={3}>
									<SingleNewsCard
										link={`/news/${data.id}`}
										title={
											lang == "fa"
												? data.title_fa
													? data.title_fa
													: data.title
												: data.title
										}
										excerpt={
											lang == "fa"
												? data.excerpt_fa
													? data.excerpt_fa
													: data.excerpt
												: data.excerpt
										}
										thumbnail={Api.url + data.thumbnail}
									/>
								</Grid>
							);
						})
					)}
					{!isLoading && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								width: "100%",
								mt: 2,
							}}
						>
							<ButtonGroup variant="outlined">
								<Button
									disabled={skip / limit < 1 && true}
									onClick={handlePrevious}
								>
									{t("common:previous")}
								</Button>
								<Button disabled={finishNews} onClick={handleNext}>
									{t("common:next")}
								</Button>
							</ButtonGroup>
						</Box>
					)}
				</Grid>
			</Container>
			<FooterOne />
		</>
	);
};

export default News;
