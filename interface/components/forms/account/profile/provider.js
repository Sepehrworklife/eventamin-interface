import React from "react";
import * as Yup from "yup";
import Authenticate from "../../../../utils/authenticate";
import useTranslation from "next-translate/useTranslation";
import {
	Snackbar,
	Alert,
	Typography,
	Grid,
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	Divider,
} from "@mui/material";
import { useFormik } from "formik";
import {
	getUserMetadata,
	updateUserMetadata,
} from "../../../../services/usersMetadata";
import FormSkeleton from "../../../elements/skeleton/form";

const ProviderForm = (props) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [data, setData] = React.useState(null);
	const [render, setRender] = React.useState(false);
	const [snackbar, setSnackbar] = React.useState({
		horizontal: "center",
		vertical: "top",
		open: false,
	});
	const auth = new Authenticate();
	const { t, lang } = useTranslation("account");

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			organization_type: data ? data.organization_type : '',
			description: data ? data.description : "",
			short_description: data ? data.short_description : "",
			offers: data ? data.offers : "",
			description_fa: data ? data.description_fa : "",
			short_description_fa: data ? data.short_description_fa : "",
			offers_fa: data ? data.offers_fa : "",
		},
		validationSchema: Yup.object({
			organization_type: Yup.string().required(
				t("validation:field_required", {
					field: t("profile.providerform.input_organization_type"),
				})
			),
			short_description: Yup.string()
				.required(
					t("validation:field_required", {
						field: t("profile.providerform.input_short_description"),
					})
				)
				.max(
					255,
					t("validation:max", {
						field: t("profile.providerform.input_short_description"),
						num: "255",
					})
				),
			description: Yup.string().max(
				2000,
				t("validation:max", {
					field: t("profile.providerform.input_description"),
					num: "2000",
				})
			),
			offers: Yup.string().max(
				1000,
				t("validation:max", {
					field: t("profile.providerform.input_offers"),
					num: "1000",
				})
			),
			description_fa: Yup.string().max(
				2000,
				t("validation:max", {
					field: t("profile.providerform.input_description_fa"),
					num: "2000",
				})
			),
			short_description_fa: Yup.string().max(
				255,
				t("validation:max", {
					field: t("profile.providerform.input_short_description_fa"),
					num: "255",
				})
			),
			offers_fa: Yup.string().max(
				1000,
				t("validation:max", {
					field: t("profile.providerform.input_offers_fa"),
					num: "1000",
				})
			),
		}),
		onSubmit: (values) => {
			let payload = [];
			Object.keys(values).map((key, index) => {
				payload.push({
					user_id: auth.getUserData().id,
					meta_key: key,
					meta_value: values[key],
				});
			});
			request(payload).then(() => setRender(true))
		},
	});

	const request = async (payload) => {
		setIsLoading(true);
		updateUserMetadata(payload)
			.then((result) =>
				result.status === 200
					? setSnackbar({
							open: true,
							horizontal: "center",
							vertical: "top",
							message: t("profile.providerform.success_message"),
							type: "success",
					  })
					: null
			)
			.then(() => setIsLoading(false))
			.catch((error) =>
				setSnackbar({
					open: true,
					horizontal: "center",
					vertical: "top",
					message: t("validation:something_wrong"),
					type: "error",
				})
			);
	};

	React.useEffect(() => {
		fetchData();
	}, [render]);

	const fetchData = () => {
		setIsLoading(true);
		let finalData = {};
		getUserMetadata(auth.getUserData().id)
			.then((result) => {
				result.data.map((obj, index) => {
					finalData[obj.meta_key] = obj.meta_value;
				});
				setData(finalData);
			})
			.then(() => setIsLoading(false))
			.catch((error) => alert(error + "Please logout and login!"));
	};

	return (
		<React.Fragment>
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
			<Typography variant="h4" component="h3" gutterBottom>
				{t("profile.providerform.title")}
			</Typography>
			<Divider />
			{isLoading ? (
				<FormSkeleton />
			) : (
				<form onSubmit={formik.handleSubmit}>
					<Grid container columnSpacing={2} my={4}>
						<Grid item xs={12}>
							<FormControl fullWidth sx={{ mb: 2 }}>
								<InputLabel id="field_organization_type_label">
									{t("profile.providerform.input_organization_type")}
								</InputLabel>
								<Select
									labelId="field_organization_type_label"
									label={t("profile.providerform.input_organization_type")}
									id="organization_type"
									onBlur={formik.handleBlur}
									name="organization_type"
									value={formik.values.organization_type}
									onChange={formik.handleChange}
									required
									error={
										formik.errors.organization_type &&
										formik.touched.organization_type &&
										true
									}
								>
									<MenuItem value="event_agency">
										{t("common:event_agency")}
									</MenuItem>
									<MenuItem value="dmc">{t("common:dmc")}</MenuItem>
									<MenuItem value="supplier">{t("common:supplier")}</MenuItem>
									<MenuItem value="event_location">
										{t("common:event_location")}
									</MenuItem>
									<MenuItem value="hotel">{t("common:hotel")}</MenuItem>
									<MenuItem value="travel_tourism">
										{t("common:travel_tourism")}
									</MenuItem>
									<MenuItem value="tourism_convention">
										{t("common:tourism_convention")}
									</MenuItem>
								</Select>
								<FormHelperText
									error={
										formik.errors.organization_type &&
										formik.touched.organization_type &&
										true
									}
								>
									{formik.errors.organization_type}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={
									formik.errors.description &&
									formik.touched.description &&
									true
								}
								helperText={
									formik.errors.description &&
									formik.touched.description &&
									formik.errors.description
								}
								id="description"
								description="description"
								variant="outlined"
								defaultValue={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.providerform.input_description")}
								sx={{ marginBottom: 2 }}
								fullWidth
								multiline
								rows={2}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								error={
									formik.errors.short_description &&
									formik.touched.short_description &&
									true
								}
								helperText={
									formik.errors.short_description &&
									formik.touched.short_description &&
									formik.errors.short_description
								}
								id="short_description"
								name="short_description"
								variant="outlined"
								defaultValue={formik.values.short_description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.providerform.input_short_description")}
								sx={{ marginBottom: 2 }}
								fullWidth
								multiline
								rows={2}
								required
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={formik.errors.offers && formik.touched.offers && true}
								helperText={
									formik.errors.offers &&
									formik.touched.offers &&
									formik.errors.offers
								}
								id="offers"
								name="offers"
								variant="outlined"
								defaultValue={formik.values.offers}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.providerform.input_offers")}
								sx={{ marginBottom: 2 }}
								fullWidth
								multiline
								rows={2}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={
									formik.errors.description_fa &&
									formik.touched.description_fa &&
									true
								}
								helperText={
									formik.errors.description_fa &&
									formik.touched.description_fa &&
									formik.errors.description_fa
								}
								dir="rtl"
								id="description_fa"
								name="description_fa"
								variant="outlined"
								defaultValue={formik.values.description_fa}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.providerform.input_description_fa")}
								sx={{ marginBottom: 2 }}
								fullWidth
								multiline
								rows={2}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={
									formik.errors.short_description_fa &&
									formik.touched.short_description_fa &&
									true
								}
								helperText={
									formik.errors.short_description_fa &&
									formik.touched.short_description_fa &&
									formik.errors.short_description_fa
								}
								id="short_description_fa"
								name="short_description_fa"
								variant="outlined"
								defaultValue={formik.values.short_description_fa}
								onChange={formik.handleChange}
								dir="rtl"
								onBlur={formik.handleBlur}
								label={t("profile.providerform.input_short_description_fa")}
								sx={{ marginBottom: 2 }}
								fullWidth
								multiline
								rows={2}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={
									formik.errors.offers_fa && formik.touched.offers_fa && true
								}
								helperText={
									formik.errors.offers_fa &&
									formik.touched.offers_fa &&
									formik.errors.offers_fa
								}
								id="offers_fa"
								name="offers_fa"
								dir="rtl"
								variant="outlined"
								defaultValue={formik.values.offers_fa}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.providerform.input_offers_fa")}
								sx={{ marginBottom: 2 }}
								fullWidth
								multiline
								rows={2}
							/>
						</Grid>
						<Grid item xs={12} sx={{ mt: 2 }}>
							<Button
								variant="contained"
								fullWidth
								size="large"
								onClick={() => formik.submitForm()}
							>
								{t("profile.providerform.submit_button")}
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
		</React.Fragment>
	);
};

export default ProviderForm;
