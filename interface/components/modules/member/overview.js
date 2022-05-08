import React from "react";
import {
	Box,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Divider,
	LinearProgress,
	Typography,
	Button,
	Chip,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { getUserMetadata } from "../../../services/usersMetadata";

export const Overview = ({ userId }) => {
	// Hooks
	const { t, lang } = useTranslation("member");

	//Initial States
	const [isLoading, setIsLoading] = React.useState(false);
	const [data, setData] = React.useState(false);
	const [expandDescription, setExpandDescription] = React.useState(false);

	React.useEffect(() => {
		fetchData();
	}, []);

	// Fetch Data
	async function fetchData() {
		setIsLoading(true);
		await getUserMetadata(userId)
			.then((response) => {
				let keyValueData = {};
				response.data.map((datum) => {
					keyValueData[datum.meta_key] = datum.meta_value;
				});
				setData(keyValueData);
			})
			.catch((response) => setData(null));
		setIsLoading(false);
	}

	return (
		<>
			<Card sx={{ mb: 3 }}>
				<CardContent>
					<Typography
						variant="h5"
						component="h4"
						fontWeight="600"
						marginBottom={1}
					>
						{t("overview.title")}
					</Typography>
					<Divider sx={{ mb: 3 }} />
					{isLoading ? (
						<LinearProgress />
					) : (
						<>
							{!data ? (
								<p>There is nothing to show</p>
							) : (
								<>
									<Typography
										variant="h5"
										component="div"
										fontWeight="600"
										textAlign="center"
										sx={{my:1}}
									>
										{t("overview.organization_type_title")}
									</Typography>
									<Typography
										variant="body1"
										component="div"
										color="text.secondary"
										marginBottom={1}
										textAlign="center"
								>
										{t("common:"+data.organization_type)}

									</Typography>
									<Divider />
									<Typography
										variant="h5"
										component="div"
										fontWeight="600"
										textAlign="center"
										sx={{my:1}}
									>
										{t("overview.offers_title")}
									</Typography>
									<Typography
										variant="body1"
										component="div"
										color="text.secondary"
										marginBottom={1}
									>
										{lang === "fa"
											? data.offers_fa
												? data.offers_fa
												: data.offers
											: data.offers}
									</Typography>
									<Divider />
									<Typography
										variant="h5"
										component="div"
										fontWeight="600"
										textAlign="center"
										sx={{my:1}}
									>
										{t("overview.description_title")}
									</Typography>
									{!expandDescription ? (
										<>
											<Typography
												variant="body1"
												component="div"
												color="text.secondary"
												marginBottom={1}
											>
												{lang === "fa"
													? data.short_description_fa
														? data.short_description_fa
														: data.short_description
													: data.short_description}
											</Typography>

											<Button
												fullWidth
												onClick={() => setExpandDescription(true)}
											>
												{t("overview.load_more")}
											</Button>
										</>
									) : (
										<>
											<Typography
												variant="body1"
												component="div"
												color="text.secondary"
												marginBottom={1}
											>
												{lang === "fa"
													? data.description_fa
														? data.description_fa
														: data.description
													: data.description}
											</Typography>
											<Button
												fullWidth
												onClick={() => setExpandDescription(false)}
											>
												{t("overview.show_less")}
											</Button>
										</>
									)}
								</>
							)}
						</>
					)}
				</CardContent>
			</Card>
		</>
	);
};
