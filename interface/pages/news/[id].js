import React from "react";
import Head from "next/head";
import MainNavbar from "../../components/layouts/navbar/main";
import { FooterOne } from "../../components/layouts/footer/one";
import { getNews } from "../../services/news";
import {
	Button,
	Container,
	Grid,
	Box,
	ButtonGroup,
	Typography,
	Divider,
	CircularProgress,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Link from "next/link";
const Api = require("../../constants/api.json");

const SingleNews = () => {
	// Hooks
	const { t, lang } = useTranslation("news");
	const router = useRouter();

	// Initial States
	const [isLoading, setIsLoading] = React.useState(false);
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetchData();
		return() => {
			setData(null);
		}
	}, [router.query.id]);

	function escapeContent() {
		const content =
			lang === "fa"
				? data.content_fa
					? data.content_fa
					: data.content
				: data.content;
		return { __html: content };
	}

	async function fetchData() {
		setIsLoading(true);
		await getNews(router.query.id)
			.then((response) => {
				if (!response.data.status) return router.push("/news");
				return response.data;
			})
			.then((data) => setData(data))
			.catch((error) => router.push("/news"));
		setIsLoading(false);
	}

	return (
		<>
			{" "}
			<Head>
				<title>{data && `${t("title")} | ${data.title}`}</title>
			</Head>
			<MainNavbar />
			<Container maxWidth="lg" sx={{ my: 5 }}>
				{isLoading && (
					<Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
						<CircularProgress />
					</Box>
				)}
				{data && (
					<>
						<Grid container spacing={3}>
							<Grid
								item
								xs={12}
								md={4}
								lg={3}
								sx={{
									position: { xs: "relative", md: "sticky" },
									top: { md: "10px" },
								}}
							>
								<img
									src={Api.url + data.thumbnail}
									style={{ maxWidth: "100%" }}
								/>
								<Divider sx={{ my: 1 }} />
								<Typography component="h2" variant="h5" fontWeight="600">
									{lang === "fa"
										? data.title_fa
											? data.title_fa
											: data.title
										: data.title}
								</Typography>
								<Typography
									component="p"
									variant="body1"
									color="text.secondary"
								>
									{new Date(data.created_datetime).toLocaleString()}
								</Typography>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										width: "100%",
										mt: 2,
									}}
								>
									<ButtonGroup variant="outlined">
										<Link href={`/news/${parseInt(router.query.id) - 1}`}>
											<Button>{t("previous")}</Button>
										</Link>
										<Link href={`/news/${parseInt(router.query.id)+ 1}`}>
											<Button>{t("next")}</Button>
										</Link>
									</ButtonGroup>
								</Box>
							</Grid>
							<Grid item xs={12} md={6} lg={7}>
								<div dangerouslySetInnerHTML={escapeContent()}></div>
							</Grid>
						</Grid>
					</>
				)}
			</Container>
			<FooterOne />
		</>
	);
};

export default SingleNews;
