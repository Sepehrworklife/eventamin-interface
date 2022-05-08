import {
	Card,
	CardContent,
	Snackbar,
	Alert,
	CardHeader,
	Divider,
	Button,
	Modal,
	Fade,
	Box,
	Typography,
	Backdrop,
	CardActions,
	Grid,
	Container,
	Paper,
	Chip,
	Stack,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Head from 'next/head';
import React from "react";
import BaseTemplate from "../../../components/templates/base";
import Authenticate from "../../../utils/authenticate";
import { useRouter } from "next/router";
import { getMessage } from "../../../services/messages";
import FormSkeleton from "../../../components/elements/skeleton/form";
const Api = require("../../../constants/api.json");

const UpdateMessage = () => {
	const { t, lang } = useTranslation("account");
	const auth = new Authenticate();
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	const [data, setData] = React.useState([]);
	React.useEffect(() => {
		auth.checkAccess(["provider", "buyer"]);
		request();
	}, []);

	const request = async () => {
		setIsLoading(true);
		await getMessage(router.query.id)
			.then((result) => {
				result.data.attachments = result.data.attachments.split(",");
				let start_date = new Date(result.data.start_date).toLocaleDateString();
				let end_date = new Date(result.data.end_date).toLocaleDateString();
				result.data.start_date = start_date;
				result.data.end_date = end_date;

				setData(result.data);
			})
			.catch((error) => {
				alert("Something Wrong! Please Try Again.");
				router.push("/account/message");
			});
		setIsLoading(false);
	};

	return (
		<>

			<Head>
				<title>{t("head:account.messages.title")}</title>
				<meta name="description" content={t("head:account.messages.description")}/>
				<meta name="keywords" content={t("head:account.messages.keywords")}/>
			</Head>
		<BaseTemplate accountMenu>
			<Card>
				<CardHeader
					title={t("message.update.page_title")}
					action={
						<>
				<Button sx={{ mx: 1 }} variant="outlined" onClick={() => router.back()}>
								{t("common:go_back_text")}
							</Button>
						</>
					}
				/>
				<Divider />
				<CardContent>
					{isLoading ? (
						<FormSkeleton />
					) : (
						<Paper variant="outlined" square sx={{ padding: 2 }}>
							<Typography variant="h6" component="div" marginBottom={1}>
								{data.name}
							</Typography>
							<Stack direction="row" spacing={1}>
								<Chip label={data.country} />
								<Chip label={data.phone} />
								<Chip label={data.email} />
							</Stack>
							<Stack direction="row" spacing={1} sx={{ mt: 1, mb: 4 }}>
								<Chip color="primary" label={data.company} />
								<Chip color="primary" label={data.job} />
							</Stack>
							<Typography variant="body2" component="div" marginBottom={4}>
								{data.description}
							</Typography>
							{data.type && (
								<>
									<Divider sx={{ my: 2 }} textAlign="center">
										{t("message.update.project_message")}
									</Divider>
									<Typography variant="body2" component="div">
										{t("message.update.destination_label")}: {data.destinations}
									</Typography>
									<Typography variant="body2" component="div">
										{t("message.update.attendees_label")}: {data.attendees}
									</Typography>
									<Typography variant="body2" component="div">
										{t("message.update.budget")}: {data.budget}
									</Typography>
									<Typography variant="body2" component="div">
										{t("message.update.start_date")}: {data.start_date}
									</Typography>
									<Typography variant="body2" component="div">
										{t("message.update.end_date")}: {data.end_date}
									</Typography>
									<Typography variant="body2" component="div">
										{t("message.update.guests_amount")}: {data.guests_amount}
									</Typography>
								</>
							)}
							<Divider sx={{ my: 2 }} textAlign="center">
								{t("message.update.attachments")}
							</Divider>
							{data.attachments &&
								data.attachments.map((obj, index) => {
									return (
										<a href={Api.url + obj} target="_blank" key={index}>
											<Button variant="outlined" size="small">
												{index + 1}
											</Button>
										</a>
									);
								})}
						</Paper>
					)}
				</CardContent>
			</Card>
		</BaseTemplate>
</>
	);
};

export default UpdateMessage;
