import React from "react";
import {
	Box,
	FormControlLabel,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Divider,
	LinearProgress,
	Typography,
	Button,
	Chip,
	Switch,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Carousel from "react-material-ui-carousel";
import { getProductWithUserID } from "../../../services/products";
import Image from "next/image";
const Api = require("../../../constants/api.json");

export const Services = ({ userId }) => {
	// Hooks
	const { t, lang } = useTranslation("member");

	//Initial States
	const [isLoading, setIsLoading] = React.useState(false);
	const [services, setServices] = React.useState([]);
	const [data, setData] = React.useState([]);
	const [loadedCount, setLoadedCount] = React.useState(1);
	const [isLoadMoreButton, setLoadMoreButton] = React.useState(true);
	const [isPersian, setIsPersian] = React.useState(
		lang === "fa" ? true : false
	);

	function handleSwitch() {
		const languageStatus = !isPersian;
		setIsPersian(!isPersian);
		const switchLanguage = services.filter(
			(service) => service.is_persian == languageStatus
		);
		setData(switchLanguage);
	}

	React.useEffect(() => {
		fetchServices();
	}, []);

	function handleLoadedOnClick() {
		setLoadedCount((prevState) => prevState + 2);
	}

	//Functions
	async function fetchServices() {
		setIsLoading(true);
		await getProductWithUserID(userId)
			.then((response) => {
				setServices(response.data);
				setData(response.data);
			})
			.catch((error) => setServices(null));
		setIsLoading(false);
	}

	return (
		<>
			<Card>
				<CardContent>
					<Typography
						variant="h5"
						component="h4"
						fontWeight="600"
						marginBottom={1}
						sx={{ display: "flex", justifyContent: "space-between" }}
					>
						{t("services.title")}
						<FormControlLabel
							control={<Switch checked={isPersian} onChange={handleSwitch} />}
							label={isPersian ? t("common:persian") : t("common:english")}
						/>
					</Typography>
					<Divider sx={{ mb: 3 }} />
					{isLoading ? (
						<LinearProgress />
					) : (
						<>
							{!services ? (
								<p>No Products/Services</p>
							) : (
								data[0] &&
								data.map((service, index) => {
									if (index > loadedCount) return;
									return (
										<>
											{index > 0 && <Divider key={10000000000} />}
											<Grid
												container
												spacing={2}
												marginBottom={1}
												marginTop={1}
												key={index}
											>
												<Grid item xs={12} sm={6} md={4}>
													<Carousel>
														{service.images ? (
															service.images.split(",").map((image, index) => {
																return (
																	<a
																		href={Api.url + image}
																		target="_blank"
																		rel="noreferrer"
																		key={index}
																	>
																		<img
																			src={Api.url + image}
																			height="200"
																			alt={service.title}
																		/>
																	</a>
																);
															})
														) : (
															<>
																<Image
																	src="/uploads/images/no-image.jpg"
																	height="200"
																	width="200"
																	alt=""
																/>
															</>
														)}
													</Carousel>
												</Grid>
												<Grid item xs={12} sm={6} md={8}>
													<Typography
														variant="h6"
														component="h5"
														fontWeight="500"
													>
														{service.title}
													</Typography>
													<Typography
														variant="body"
														component="div"
														color="text.secondary"
														marginBottom={3}
													>
														{service.description?.slice(0, 60)}
													</Typography>
													<Box>
														{service.attachments &&
															service.attachments
																.split(",")
																.map((attachment, index) => {
																	return (
																		<a
																			href={Api.url + attachment}
																			key={index}
																			target="_blank"
																			rel="noreferrer"
																		>
																			<Button variant="outlined" size="small">
																				{index + 1}
																			</Button>
																		</a>
																	);
																})}
													</Box>
												</Grid>
											</Grid>
										</>
									);
								})
							)}
						</>
					)}

					{isLoadMoreButton && (
						<Button
							onClick={handleLoadedOnClick}
							variant="contained"
							size="large"
							fullWidth
							sx={{ mt: 4 }}
						>
							{t("services.load_more")}
						</Button>
					)}
				</CardContent>
			</Card>
		</>
	);
};
