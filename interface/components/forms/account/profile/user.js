import * as Yup from "yup";
import {
	Snackbar,
	Alert,
	Button,
	Grid,
	TextField,
	Typography,
	Divider,
	FormHelperText
} from "@mui/material";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import UploadField from "../../../elements/upload";
import { fetchUser } from "../../../../services/users";
import Authenticate from "../../../../utils/authenticate";
import FormSkeleton from "../../../elements/skeleton/form";
import { base } from "../../../../services/users";


const Api = require('../../../../constants/api.json');

const urlReg =
	/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const roleHasAccess = ["buyer", "provider"];
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const UserForm = (props) => {
	const { t, lang } = useTranslation("account");
	const [logo, setLogo] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [data, setData] = React.useState(null);
	const [render, setRender] = React.useState(false);
	const [snackbar, setSnackbar] = React.useState({
		horizontal: "center",
		vertical: "top",
		open: false,
	});
	const auth = new Authenticate();
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: data ? data.name : "",
			phone: data ? data.phone : "",
			name_fa: data ? data.name_fa : "",
			company: data ? data.company : "",
			company_fa: data ? data.company_fa : "",
			logo: data ? data.logo : "",
			website: data ? data.website : "",
			address: data ? data.address : "",
			address_fa: data ? data.address_fa : "",
		},
		validationSchema: Yup.object({
			company: Yup.string().required(
				t("validation:field_required", {
					field: t("profile.userform.input_company"),
				})
			),
			logo: Yup.string().required(
				t("validation:field_required", {
					field: t("profile.userform.input_logo"),
				})
			),
			website: Yup.string().matches(urlReg, t("validation:correct_website")),
			name: Yup.string().required(
				t("validation:field_required", {
					field: t("profile.userform.input_name"),
				})
			),
			phone: Yup.string()
				.matches(phoneRegExp, t("validation:invalid_phone"))
				.required(
					t("validation:field_required", {
						field: t("profile.userform.input_phone"),
					})
				),
		}),
		onSubmit: (values) => {
			if (values.phone === data.phone) delete values.phone;
			if (logo.length > 0)
				formik.setFieldValue("logo", "uploads/" + logo[0].id);
			request(values)
		},
	});

	const request = async (payload) => {
		setIsLoading(true);
		if (payload.phone === data.phone) alert(1)
		await base("put", payload, data.id)
			.then((result) =>
				result.status === 200
					? setSnackbar({
							open: true,
							horizontal: "center",
							vertical: "top",
							message: t("profile.userform.success_message"),
							type: "success",
					  })
					: null
			)
			.catch((error) =>
				error.response.status === 406
					? setSnackbar({
							open: true,
							horizontal: "center",
							vertical: "top",
							message: t("profile.userform.phone_exists_erorr"),
							type: "error",
					  })
					: setSnackbar({
							open: true,
							horizontal: "center",
							vertical: "top",
							message: t("validation:something_wrong"),
							type: "error",
					  })
			);
		setIsLoading(false);
		setRender(true);
	};

	const setUpload = (value) => {
		setLogo(value);
		setTimeout(() => {
			formik.setFieldValue("logo", "uploads/" + value[0].id);
		}, 100);
	};

	React.useEffect(() => {
		auth.checkAccess(roleHasAccess);
		fetchData();
	}, [render]);

	const fetchData = async () => {
		setIsLoading(true);
		await fetchUser(auth.getUserData().id)
			.then((result) => setData(result.data))
			.catch((error) => alert("Somethign happend"));
		setIsLoading(false);
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
				{t("profile.userform.title")}
			</Typography>
			<Divider />
			{isLoading ? (
				<FormSkeleton />
			) : (
				<form onSubmit={formik.handleSubmit}>
					<Grid container columnSpacing={2}>
						<Grid item xs={6} sx={{ my: 2, display: "flex" }}>
							<UploadField
								setUpload={setUpload}
								fileType={["image/jpeg", "image/png"]}
								maxLength={1}
								fileSize={1.2}
								buttonVariant="outlined"
								buttonFullWidth={true}
								buttonSize="large"
								buttonText={t("profile.userform.input_logo")}
								buttonColor={formik.errors.logo ? "error" : "primary"}
								inputID="field_logo"
								inputName="logo"
								accept="image/*"
								multiple={true}
							/>
							{formik.errors.logo && formik.touched.logo ? (
								<FormHelperText error={true}>
									{formik.errors.logo}
								</FormHelperText>
							) : null}
						</Grid>
						<Grid item xs={6} sx={{ my: 2 }}>
							<Typography variant="" component="p">
								{t("profile.userform.current_logo_label")}
							</Typography>
							<img
								src={data && Api.url + data.logo}
								width="150"
								height="150"
								alt={data && data.name}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={formik.errors.name && formik.touched.name && true}
								helperText={
									formik.errors.name &&
									formik.touched.name &&
									formik.errors.name
								}
								id="name"
								name="name"
								variant="outlined"
								defaultValue={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.userform.input_name")}
								sx={{ marginBottom: 2 }}
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={formik.errors.name_fa && formik.touched.name_fa && true}
								helperText={
									formik.errors.name_fa &&
									formik.touched.name_fa &&
									formik.errors.name_fa
								}
								id="name_fa"
								name_fa="name_fa"
								variant="outlined"
								dir="rtl"
								defaultValue={formik.values.name_fa}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.userform.input_name_fa")}
								sx={{ marginBottom: 2 }}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={formik.errors.phone && formik.touched.phone && true}
								helperText={
									formik.errors.phone &&
									formik.touched.phone &&
									formik.errors.phone
								}
								id="phone"
								name="phone"
								variant="outlined"
								defaultValue={formik.values.phone}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.userform.input_phone")}
								sx={{ marginBottom: 2 }}
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={formik.errors.website && formik.touched.website && true}
								helperText={
									formik.errors.website &&
									formik.touched.website &&
									formik.errors.website
								}
								id="website"
								name="website"
								variant="outlined"
								defaultValue={formik.values.website}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.userform.input_website")}
								sx={{ marginBottom: 2 }}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={formik.errors.company && formik.touched.company && true}
								helperText={
									formik.errors.company &&
									formik.touched.company &&
									formik.errors.company
								}
								id="company"
								name="company"
								variant="outlined"
								defaultValue={formik.values.company}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.userform.input_company")}
								sx={{ marginBottom: 2 }}
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={
									formik.errors.company_fa && formik.touched.company_fa && true
								}
								helperText={
									formik.errors.company_fa &&
									formik.touched.company_fa &&
									formik.errors.company_fa
								}
								id="company_fa"
								name="company_fa"
								variant="outlined"
								dir="rtl"
								defaultValue={formik.values.company_fa}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.userform.input_company_fa")}
								sx={{ marginBottom: 2 }}
								fullWidth
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								error={formik.errors.address && formik.touched.address && true}
								helperText={
									formik.errors.address &&
									formik.touched.address &&
									formik.errors.address
								}
								id="address"
								name="address"
								variant="outlined"
								defaultValue={formik.values.address}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.userform.input_address")}
								sx={{ marginBottom: 2 }}
								fullWidth
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								error={
									formik.errors.address_fa && formik.touched.address_fa && true
								}
								helperText={
									formik.errors.address_fa &&
									formik.touched.address_fa &&
									formik.errors.address_fa
								}
								id="address_fa"
								name="address_fa"
								dir="rtl"
								variant="outlined"
								defaultValue={formik.values.address_fa}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("profile.userform.input_address_fa")}
								sx={{ marginBottom: 2 }}
								fullWidth
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12} sx={{ mt: 2 }}>
							<Button
								variant="contained"
								fullWidth
								size="large"
								onClick={() => formik.submitForm()}
							>
								{t("profile.userform.submit_button")}
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
		</React.Fragment>
	);
};

export default UserForm;
