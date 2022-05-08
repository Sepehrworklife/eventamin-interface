import React from "react";
import {
	Card,
	CardHeader,
	ListItemIcon,
	CardContent,
	CardActions,
	Avatar,
	Typography,
	List,
	ListItem,
	ListItemText,
	CircularProgress,
	LinearProgress,
	Button,
} from "@mui/material";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import useTranslation from "next-translate/useTranslation";
import { blue } from "@mui/material/colors";
import { CountryDetector } from "../../../utils/country";
import { RFPContext } from "../../../contexts/app-rfp-provider";
const Api = require("../../../constants/api.json");

export const AccountDetails = ({ data }) => {
	// Hooks
	const { t, lang } = useTranslation("member");

	// Initial States
	const { rfp, setRfp } = React.useContext(RFPContext);
	const [ isAdded, setIsAdded ] = React.useState(false);

	// Initial Data
	const name =
		lang === "fa" ? (data.name_fa ? data.name_fa : data.name) : data.name;
	const logo = Api.url + data.logo;
	const address =
		lang === "fa"
			? data.address_fa
				? data.address_fa
				: data.address
			: data.address;
	const country = CountryDetector(data.country, lang);
	const company =
		lang === "fa"
			? data.company_fa
				? data.company_fa
				: data.company
			: data.company;

	const included_data = {
		username: data.username?.toUpperCase(),
		company: company?.toUpperCase(),
		email: data.email?.toUpperCase(),
		phone: data.phone,
		country: country?.toUpperCase(),
		city: data.city?.toUpperCase(),
	};

	// Functions

	function handleClick(event, data) {
		event.preventDefault();
		if (
			rfp.filter((value) => JSON.stringify(value) === JSON.stringify(data))
				.length > 0
		)
			return;
		setRfp((prev) => [...prev, data]);
		setIsAdded(true);
	}

	return (
		<>
			<Card sx={{ position: "sticky", top: "10px", marginTop: 1}}>
				<CardContent>
					{data ? (
						<>
							<Avatar
								alt={name?.toUpperCase()}
								sx={{
									width: 100,
									height: 100,
									mb: 1,
									mx: "auto",
									bgcolor: blue[500],
								}}
								src={logo}
							/>
							<Typography
								variant="h5"
								components="h4"
								fontWeight="600"
								textAlign="center"
							>
								{name?.toUpperCase()}
							</Typography>
							<List>
								{Object.keys(included_data).map((key, index) => {
									return (
										<ListItem key={index}>
											<ListItemIcon>
												<FiberSmartRecordIcon />
											</ListItemIcon>
											<ListItemText
												primary={included_data[key]}
												secondary={t(`account.${key}`)}
											/>
										</ListItem>
									);
								})}
							</List>
						</>
					) : (
						<LinearProgress />
					)}
				</CardContent>
				<CardActions>
					<Button
						onClick={(e) =>
							handleClick(e, {
								id: data.id,
								company: data.company,
								company_fa: data.company_fa,
								logo: data.logo,
							})
						}
					>
						{isAdded ? t("account.added_to_rfp") :t("account.add_to_rfp")}
					</Button>
				</CardActions>
			</Card>
		</>
	);
};
