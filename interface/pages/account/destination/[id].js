import Head from 'next/head';
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
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import BaseTemplate from "../../../components/templates/base";
import Authenticate from "../../../utils/authenticate";
import { useRouter } from "next/router";
import UpdateForm from "../../../components/modules/destination/update-form";
import { removeDestination } from "../../../services/destinations";
import DeleteModal from "../../../components/modules/delete-modal";

const UpdateDestination = () => {
	const { t, lang } = useTranslation("account");
	const auth = new Authenticate();
	const router = useRouter();
	const [snackbar, setSnackbar] = React.useState({
		horizontal: "center",
		vertical: "top",
		open: false,
	});

	const [modal, setModal] = React.useState(false);
	const handleModalClose = () => setModal(false);
	const handleModalOpen = () => setModal(true);

	React.useEffect(() => {
		auth.checkAccess(["provider"]);
	}, []);

	const removeHandler = () => {
		removeRequest().then(() =>
			setTimeout(() => {
				router.push("/account/destination");
			}, 1500)
		);
	};

	const removeRequest = async () => {
		removeDestination(router.query.id).then(() =>
			setSnackbar({
				open: true,
				horizontal: "center",
				vertical: "bottom",
				message: t("destination.update.delete_success"),
				type: "success",
			})
		);
	};

	return (
		<>
<Head>
				<title>{t("head:account.destinations.title")}</title>
				<meta name="description" content={t("head:account.destinations.description")}/>
				<meta name="keywords" content={t("head:account.destinations.keywords")}/>
			</Head>
		<BaseTemplate accountMenu>
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={() =>
					setSnackbar({
						open: false,
						message: null,
						type: "error",
						vertical: "top",
						horizontal: "center",
					})
				}
				anchorOrigin={{
					vertical: snackbar.vertical,
					horizontal: snackbar.horizontal,
				}}
			>
				<Alert severity={snackbar.type} sx={{ width: "100%" }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
			<DeleteModal
				modal={modal}
				removeHandler={removeHandler}
				handleModalClose={handleModalClose}
			/>
			<Card>
				<CardHeader
					title={t("destination.update.page_title")}
					action={
						<>
							<Button
								sx={{ mx: 1 }}
								variant="outlined"
								onClick={() => router.back()}
							>
								{t("common:go_back_text")}
							</Button>
							<Button
								variant="outlined"
								color="error"
								onClick={handleModalOpen}
							>
								{t("common:delete")}
							</Button>
						</>
					}
				/>
				<Divider />
				<CardContent>
					<UpdateForm setSnackbar={setSnackbar} />
				</CardContent>
			</Card>
		</BaseTemplate>
</>
	);
};

export default UpdateDestination;
