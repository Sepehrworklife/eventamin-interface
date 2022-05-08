import {
	Card,
	CardContent,
	Snackbar,
	Alert,
	CardHeader,
	Divider,
	Button,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import BaseTemplate from "../../../components/templates/base";
import Authenticate from "../../../utils/authenticate";
import { useRouter } from "next/router";
import UpdateForm from "../../../components/modules/product/update-form";
import DeleteModal from "../../../components/modules/delete-modal";
import { removeProduct } from "../../../services/products";
import Head from 'next/head';

const UpdateProduct = () => {
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
				router.push("/account/product");
			}, 1500)
		);
	};

	const removeRequest = async () => {
		removeProduct(router.query.id).then(() =>
			setSnackbar({
				open: true,
				horizontal: "center",
				vertical: "bottom",
				message: t("product.update.delete_success"),
				type: "success",
			})
		);
	};

	return (
		<>

			<Head>
				<title>{t("head:account.profile.title")}</title>
				<meta name="description" content={t("head:account.profile.description")}/>
				<meta name="keywords" content={t("head:account.profile.keywords")}/>
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
					title={t("product.update.page_title")}
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

export default UpdateProduct;
