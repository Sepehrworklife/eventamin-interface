import {
	Card,
	ListItemIcon,
	ListItemText,
	Grid,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	Chip,
	Stack,
	ListItem,
	Alert,
	AlertTitle,
	List,
	CardHeader,
	Divider,
	CircularProgress,
	Box,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import BaseTemplate from "../../components/templates/base";
import Authenticate from "../../utils/authenticate";
import ImageTextSkeleton from "../../components/elements/skeleton/image-text";
import { CountryDetector } from "../../utils/country";
import { ResultTable as DestinationResultTable } from "../../components/modules/destination/table-result";
import { ResultTable as MessageResultTable } from "../../components/modules/message/table-result";

import { ResultTable as ProductResultTable } from "../../components/modules/product/table-result";
const Api = require("../../constants/api.json");

const roleHasAccess = ["provider", "buyer"];

const Account = () => {
	const router = useRouter();
	const [upgradeNotification, setUpgradeNotifiction] = React.useState(true);
	const [newUser, setNewUser] = React.useState(true);
	const auth = new Authenticate();
	const { t, lang } = useTranslation("account");
	const [user, setUser] = React.useState([]);

	React.useEffect(() => {
			if (auth.getUserData().role === null || auth.getUserData().role === "")
				return router.push("/account/new");
		auth.checkAccess(roleHasAccess);
		setUser(auth.getUserData());
		setNewUser(false);
	}, []);

	return (
		<>
			<Head>
				<title>{t("head:account.title")}</title>
				<meta name="description" content={t("head:account.description")} />
				<meta name="keywords" content={t("head:account.keywords")} />
			</Head>
			{newUser && (
				<Box sx={{minHeight: "100vh", display: "flex", justifyContent:"center", alignItems:"center"}}>
				<CircularProgress fontSize="72"/>
			</Box>
			)}
			{!newUser && (
				<BaseTemplate accountMenu={true}>
					{user && user.role === "provider" ? (
						<Alert severity="success" variant="filled" sx={{ mb: 2 }}>
							<AlertTitle>{t("upgrade_now_title")}</AlertTitle>
							{t("upgrade_now_desc")}
							<Button variant="standard" size="small">
								{t("upgrade_now_link")}
							</Button>
						</Alert>
					) : null}
					<Grid container spacing={4}>
						<Grid item xs={12} sm={12} md={6} lg={4}>
							{user ? (
								<Card>
									<CardActionArea>
										<CardMedia
											component="img"
											image={Api.url + user.logo}
											alt={user.name}
										/>
										<CardContent>
											<Typography variant="h5" component="div">
												{lang === "fa"
													? user.name_fa
														? user.name_fa
														: user.name?.toUpperCase() || ""
													: user.name?.toUpperCase() || ""}
											</Typography>
											<Stack direction="row" spacing={1} sx={{ my: 2 }}>
												<Chip
													label={user.role}
													color="primary"
													variant="outlined"
												/>
											</Stack>
											<List dense={true}>
												<ListItem>
													<ListItemText
														primary={user.email?.toUpperCase() || ""}
														secondary={t("email_label")}
													/>
												</ListItem>
												<ListItem>
													<ListItemText
														primary={user.phone}
														secondary={t("phone_label")}
													/>
												</ListItem>
												<ListItem>
													<ListItemText
														primary={
															lang === "fa"
																? user.company_fa
																	? user.company_fa
																	: user.company?.toUpperCase() || ""
																: user.company?.toUpperCase() || ""
														}
														secondary={t("company_label")}
													/>
												</ListItem>
												<ListItem>
													<ListItemText
														primary={
															user.country &&
															CountryDetector(user.country, lang).toUpperCase()
														}
														secondary={t("country_label")}
													/>
												</ListItem>
											</List>
										</CardContent>
									</CardActionArea>
									<CardActions>
										<Button
											size="small"
											color="primary"
											onClick={() => router.push("/account/profile")}
										>
											{t("update_user_text")}
										</Button>
									</CardActions>
								</Card>
							) : (
								<ImageTextSkeleton />
							)}
						</Grid>
						<>
							<Grid item xs={12} md={6} lg={8}>
								{user && user.role == "provider" && (
									<Card sx={{ mb: 3 }}>
										<CardHeader title={t("destination_card_title")} />
										<Divider />
										<CardContent>
											<DestinationResultTable
												pageSize={5}
												rowsPerPageOptions={[5]}
											/>
										</CardContent>
										<CardActions>
											<Button
												size="small"
												onClick={() => router.push("/account/destination")}
											>
												{t("destination_text_link")}
											</Button>
										</CardActions>
									</Card>
								)}
								<Card>
									<CardHeader title={t("message_card_title")} />
									<Divider />
									<CardContent>
										<MessageResultTable pageSize={5} rowsPerPageOptions={[5]} />
									</CardContent>
									<CardActions>
										<Button
											size="small"
											onClick={() => router.push("/account/message")}
										>
											{t("message_text_link")}
										</Button>
									</CardActions>
								</Card>

								{user && user.role == "provider" && (
									<Card sx={{ mt: 3 }}>
										<CardHeader title={t("product_card_title")} />
										<Divider />
										<CardContent>
											<ProductResultTable
												pageSize={5}
												rowsPerPageOptions={[5]}
											/>
										</CardContent>
										<CardActions>
											<Button
												size="small"
												onClick={() => router.push("/account/product")}
											>
												{t("product_text_link")}
											</Button>
										</CardActions>
									</Card>
								)}
							</Grid>
						</>
					</Grid>
				</BaseTemplate>
			)}
		</>
	);
};

export default Account;
