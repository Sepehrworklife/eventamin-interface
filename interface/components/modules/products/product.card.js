import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PublicIcon from "@mui/icons-material/Public";
import { RFPContext } from "../../../contexts/app-rfp-provider";
import { CountryDetector } from "../../../utils/country";
import {
	Backdrop,
	CardHeader,
	Container,
	ButtonGroup,
	Divider,
	Fade,
	Grid,
	Modal,
} from "@mui/material";
const Api = require("../../../constants/api.json");
import Carousel from "react-material-ui-carousel";
import Link from 'next/link';
import Image from "next/image";
import NoImage from "../../../public/uploads/images/no-image.jpg";
import useTranslation from "next-translate/useTranslation";

export const ProductCard = ({
	images,
	userId,
	countries,
	title,
	content,
	company,
	attachments,
	company_fa,
	logo,
}) => {
	// Hooks
	const { t, lang } = useTranslation('products');

	// Initial State
	const [modal, setModal] = React.useState(false);
	const { rfp, setRfp } = React.useContext(RFPContext);

	function handleClick(event, data) {
		event.preventDefault();
		if (
			rfp.filter((value) => JSON.stringify(value) === JSON.stringify(data))
				.length > 0
		)
			return;
		setRfp((prev) => [...prev, data]);
	}

	function handleModalClose() {
		setModal(false);
	}

	function handleModalOpen() {
		setModal(true);
	}

	return (
		<>
			<Card sx={{ width: 1, position: "relative" }}>
				<CardMedia
					component="img"
					image={images ? Api.url + images[0] : NoImage.src}
					alt="green iguana"
					height="200"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{content}
					</Typography>
				</CardContent>
				<CardActions>
					<Typography
						variant="body2"
						component="p"
						sx={{ display: "flex", alignItems: "center" }}
						color="text.secondary"
					>
						<ApartmentIcon size="small" />
						{lang === "fa" ? (company_fa ? company_fa : company) : company}
					</Typography>
				</CardActions>
				<a
					onClick={handleModalOpen}
					href="#"
					style={{
						width: "100%",
						height: "100%",
						position: "absolute",
						top: "0",
						left: "0",
						right: "0",
						zIndex: "3",
					}}
				></a>
			</Card>
			{modal && (
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					open={modal}
					onClose={handleModalClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={modal}>
						<Container
							maxWidth="lg"
							sx={{
								position: "absolute",
								left: "50%",
								transform: "translate(-50%, -50%)",
								top: "50%",
							}}
						>
							<Card>
								<CardContent sx={{ maxHeight: "70vh", overflowY: "scroll" }}>
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={9}>
													<Typography
														variant="body2"
														color="text.secondary"
														component="span"
														marginX={1}
														sx={{ display: "flex", alignItems: "center" }}
													>
														<ApartmentIcon size="small" />
														{lang === "fa"
															? company_fa
																? company_fa
																: company
															: company}
													</Typography>
													{countries.map((country, index) => {
														return (
															<Typography
																variant="body2"
																marginX={1}
																color="text.secondary"
																sx={{ display: "flex", alignItems: "center" }}
																component="span"
																key={index}
															>
																<PublicIcon size="small" />
																{CountryDetector(country, lang)}
															</Typography>
														);
													})}
												</Grid>
												<Grid item xs={12} sm={3} sx={{overflow: "hidden"}}>
													<img src={Api.url + logo} height="70" />
												</Grid>
											</Grid>
											<Divider sx={{ my: 2 }} />
											<Typography variant="h4" component="h2" fontWeight="600">
												{title}
											</Typography>
											<Typography
												variant="body"
												component="div"
												fontWeight="300"
											>
												{content}
											</Typography>
											<Divider sx={{ my: 2 }} />
											<ButtonGroup size="large" aria-label="large button group">
													<Link
														href={`/member/${userId}`}
													>
												<Button variant="outlined">
														{t("list.profile_page")}
												</Button>
													</Link>
												<Button
													variant="contained"
													onClick={(e) =>
														handleClick(e, {
															id: userId,
															company: company,
															company_fa: company_fa,
															logo: logo,
														})
													}
												>
													{t("list.add_to_rfp")}
												</Button>
											</ButtonGroup>
										</Grid>
										<Grid item xs={12} md={6}>
											<Typography
												variant="h6"
												component="div"
												fontWeight="600"
												marginBottom={1}
											>
												{t("list.images")}
											</Typography>
											<Carousel>
												{images
													? images.map((image, index) => {
															return (
																<img
																	key={index}
																	src={Api.url + image}
																	alt={title}
																	style={{ width: "100%" }}
																/>
															);
													  })
													: [1, 2].map((obj, index) => {
															return (
																<img
																	src={NoImage.src}
																	style={{ width: "100%" }}
																	key={index}
																/>
															);
													  })}
											</Carousel>
											<Typography
												variant="h6"
												component="div"
												fontWeight="600"
												marginBottom={1}
											>
												{t("list.attachments")}
											</Typography>
											{attachments &&
												attachments.map((obj, index) => {
													return (
														<a
															href={Api.url + obj}
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
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Container>
					</Fade>
				</Modal>
			)}
		</>
	);
};
