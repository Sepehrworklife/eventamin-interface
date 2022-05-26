import React from "react";
import BaseTemplate from "../../components/templates/base";
import {
	Snackbar,
	Divider,
	Paper,
	Step,
	StepLabel,
	InputLabel,
	Select,
	MenuItem,
	Stepper,
	Typography,
	Grid,
	TextField,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Autocomplete,
	Box,
	Button,
	FormHelperText,
	Alert,
	Backdrop,
	CircularProgress,
} from "@mui/material";
import { base } from "../../services/users";
import * as Yup from "yup";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { useFormik } from "formik";
import { countries } from "../../constants/countries";
import Authenticate from "../../utils/authenticate";
import { contactInformationRequest } from "../../hooks/account/new";
import UploadField from "../../components/elements/upload";
import { useRouter } from "next/router";
import { bulkCreate } from "../../services/usersMetadata";

const urlReg =
	/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const roleHasAccess = [null, "", "provider"];

const New = () => {
	const router = useRouter();
	const { t } = useTranslation("account");
	const auth = new Authenticate();
	const [activeStep, setActiveStep] = React.useState(0);
	const [steps, setSteps] = React.useState([
		t("new.initial_data"),
		t("new.provider_data"),
	]);
	const [logo, setLogo] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [snackbar, setSnackbar] = React.useState({
		horizontal: "center",
		vertical: "top",
		open: false,
		message: null,
		type: "error",
	});

	React.useEffect(() => {
		auth.checkAccess(roleHasAccess);
	});

	const formik = useFormik({
		initialValues: {
			role: "provider",
			website: "",
			company: "",
			company_fa: "",
			country: "",
			city: "",
			logo: "",
			address: "",
			address_fa: "",
		},
		validationSchema: Yup.object({
			company: Yup.string().required(
				t("validation:field_required", { field: "Company" })
			),
			country: Yup.string().required(
				t("validation:field_required", { field: "Country" })
			),
			role: Yup.string().required(
				t("validation:field_required", { field: "Role" })
			),
			city: Yup.string().required(
				t("validation:field_required", { field: "City" })
			),
			logo: Yup.string().required(
				t("validation:field_required", { field: "Logo" })
			),
			website: Yup.string().matches(urlReg, t("validation:correct_website")),
		}),
		onSubmit: (values) => {
			setIsLoading(true);
			base("put", values, auth.getUserData().id)
				.then((result) => {
					setActiveStep((prevActiveStep) => prevActiveStep + 1);
					if (values.role === "buyer") {
						auth.removeToken();
						setTimeout(() => {
							router.push("/login/?again=true");
						}, 1200);
					}
				})
				.catch((erorr) =>
					setSnackbar({
						open: true,
						message: t("validation:something_wrong"),
						vertical: "top",
						horizontal: "center",
						type: "error",
					})
				);
			setIsLoading(false);
		},
	});

	const providerFormik = useFormik({
		initialValues: {
			organization_type: "dmc",
			short_description: "",
			description: "",
			offers: "",
			short_description_fa: "",
			description_fa: "",
			offers_fa: "",
		},
		validationSchema: Yup.object({
			short_description: Yup.string()
				.required(
					t("validation:field_required", { field: "Short Description" })
				)
				.max(
					255,
					t("validation:max", { field: "Short Description", num: "255" })
				),
			description: Yup.string().max(
				2000,
				t("validation:max", { field: "Description", num: "2000" })
			),
			offers: Yup.string().max(
				1000,
				t("validation:max", { field: "Offers", num: "1000" })
			),
			organization_type: Yup.string().required(
				t("validation:field_required", { field: "Organization Type" })
			),
		}),
		onSubmit: (values) => {
			setIsLoading(true);
			let payload = [];
			Object.keys(values).forEach((key, index) => {
				payload.push({
					user_id: auth.getUserData().id,
					meta_key: key,
					meta_value: values[key]
				});
			});
			bulkCreate(payload)
				.then((result) => {
					setActiveStep((prevActiveStep) => prevActiveStep + 1);
						auth.removeToken();
						setTimeout(() => {
							router.push("/login/?again=true");
						}, 1200);
				})
				.catch((erorr) =>
					setSnackbar({
						open: true,
						message: t("validation:something_wrong"),
						vertical: "top",
						horizontal: "center",
						type: "error",
					})
				);
			setIsLoading(false);
		},
	});
	const userType = (e) => {
		if (e.target.value === "provider") {
			setSteps([t("new.initial_data"), t("new.provider_data")]);
		} else {
			setSteps([t("new.initial_data")]);
		}
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	const handleNext = () => {
		if (activeStep === 0) {
			formik.submitForm();
		}
		if (activeStep === 1) {
			providerFormik.submitForm();
		}
	};
	const setUpload = (value) => {
		setLogo(value);
		setTimeout(() => {
			formik.setFieldValue("logo", "uploads/" + value[0].id);
		}, 100);
	};

	return (
		<>
			<Head>
				<title>{t("new.page_title")}</title>
			</Head>
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
			<Backdrop
				open={isLoading}
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
			>
				{" "}
				<CircularProgress color="inherit" />
			</Backdrop>
			<BaseTemplate>
				<Paper sx={{ px: 8, py: 4 }}>
					<Typography variant="h4" component="h2">
						{t("new.section_title")}
					</Typography>
					<Divider sx={{ my: 2 }} />
					<Box sx={{ width: "100%", my: 4 }}>
						<Stepper activeStep={activeStep}>
							{steps.map((label, index) => {
								const stepProps = {};
								const labelProps = {};
								return (
									<Step key={label} {...stepProps}>
										<StepLabel {...labelProps}>{label}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
						{activeStep === 0 ? (
							<form onSubmit={formik.handleSubmit} id="initial-data-form">
								<Grid container spacing={2} sx={{ my: 3 }}>
									<Grid item xs={12}>
										<FormControl component="fieldset">
											<FormLabel
												component="legend"
												error={
													formik.errors.role && formik.touched.role && true
												}
											>
												{t("new.field_role")}
											</FormLabel>
											<FormHelperText
												error={
													formik.errors.role && formik.touched.role && true
												}
											>
												{formik.errors.role}
											</FormHelperText>
											<RadioGroup
												aria-label="role"
												value={formik.values.role}
												onChange={(e, value) =>
													formik.setFieldValue("role", value)
												}
												onClick={userType}
												onBlur={formik.handleBlur}
												name="field_role"
												id="role"
												row
											>
												<FormControlLabel
													value="provider"
													control={<Radio />}
													label={t("common:provider")}
												/>
												<FormControlLabel
													value="buyer"
													control={<Radio />}
													label={t("common:buyer")}
												/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											error={
												formik.errors.company && formik.touched.company && true
											}
											helperText={
												formik.errors.company &&
												formik.touched.company &&
												formik.errors.company
											}
											fullWidth
											id="field_company"
											name="company"
											variant="outlined"
											required
											label={t("new.field_company")}
											defaultValue={formik.values.company}
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											fullWidth
											id="field_company_fa"
											dir="rtl"
											name="company_fa"
											variant="outlined"
											label={t("new.field_company_fa")}
											defaultValue={formik.values.company_fa}
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Autocomplete
											id="field_country"
											name="country"
											options={countries}
											autoHighlight
											onOpen={formik.handleBlur}
											onChange={(e, value) =>
												formik.setFieldValue(
													"country",
													value !== null ? value.code : formik.values.country
												)
											}
											getOptionLabel={(option) => option.label}
											renderOption={(props, option) => (
												<Box
													component="li"
													sx={{
														"& > img": {
															mr: 2,
															flexShrink: 0,
														},
													}}
													{...props}
												>
													<img
														loading="lazy"
														width="20"
														src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
														srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
														alt=""
													/>
													{option.label} ({option.code}) +{option.phone}
												</Box>
											)}
											renderInput={(params) => (
												<TextField
													error={
														formik.errors.country &&
														formik.touched.country &&
														true
													}
													helperText={
														formik.errors.country &&
														formik.touched.country &&
														formik.errors.country
													}
													{...params}
													label={t("new.field_country")}
													fullWidth
													required
													inputProps={{
														...params.inputProps,
														autoComplete: "field_country", // disable autocomplete and autofill
													}}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											error={formik.errors.city && formik.touched.city && true}
											helperText={
												formik.errors.city &&
												formik.touched.city &&
												formik.errors.city
											}
											fullWidth
											id="field_city"
											name="city"
											required
											variant="outlined"
											label={t("new.field_city")}
											defaultValue={formik.values.city}
											onBlur={formik.handleChange}
											onChange={formik.handleBlur}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											fullWidth
											id="field_address"
											name="address"
											variant="outlined"
											label={t("new.field_address")}
											defaultValue={formik.values.address}
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											multiline
											rows={4}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											multiline
											rows={4}
											fullWidth
											id="field_address_fa"
											dir="rtl"
											name="address_fa"
											variant="outlined"
											label={t("new.field_address_fa")}
											defaultValue={formik.values.address_fa}
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											error={
												formik.errors.website && formik.touched.website && true
											}
											helperText={
												formik.errors.website &&
												formik.touched.website &&
												formik.errors.website
											}
											fullWidth
											id="field_website"
											name="website"
											variant="outlined"
											label={t("new.field_website")}
											defaultValue={formik.values.website}
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
										/>
									</Grid>
									<Grid
										item
										xs={12}
										md={6}
										sx={{
											display: "flex",
											alignItems: "center",
											flexDirection: "column",
										}}
									>
										<UploadField
											setUpload={setUpload}
											fileType={["image/jpeg", "image/png"]}
											maxLength={1}
											fileSize={1.2}
											buttonVariant="outlined"
											buttonFullWidth={true}
											buttonSize="large"
											buttonText={t("new.field_logo")}
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
											<FormHelperText>
												{t("new.logo_suggest")}
											</FormHelperText>
									</Grid>
								</Grid>
							</form>
						) : null}
						{activeStep === 1 ? (
							<form onSubmit={providerFormik.handleSubmit}>
								<Grid container spacing={2} sx={{ my: 3 }}>
									<Grid item xs={12}>
										<FormControl fullWidth>
											<InputLabel id="field_organization_type_label">
												{t("new.field_organization_type")}
											</InputLabel>
											<Select
												labelId="field_organization_type_label"
												label={t("new.field_organization_type")}
												id="field_organization_type"
												onBlur={providerFormik.handleBlur}
												value={providerFormik.values.organization_type}
												name="organization_type"
												onChange={providerFormik.handleChange}
												required
												error={
													providerFormik.errors.organization_type &&
													providerFormik.touched.organization_type &&
													true
												}
											>
												<MenuItem value="event_agency">
													{t("common:event_agency")}
												</MenuItem>
												<MenuItem value="dmc">{t("common:dmc")}</MenuItem>
												<MenuItem value="supplier">
													{t("common:supplier")}
												</MenuItem>
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
													providerFormik.errors.organization_type && providerFormik.touched.organization_type && true
												}
											>
												{providerFormik.errors.organization_type}
											</FormHelperText>
										</FormControl>
									</Grid>
									<Grid item xs={12}>
										<TextField
											error={
												providerFormik.errors.short_description &&
												providerFormik.touched.short_description &&
												true
											}
											helperText={
												providerFormik.errors.short_description &&
												providerFormik.touched.short_description &&
												providerFormik.errors.short_description
											}
											multiline
											required
											rows={4}
											fullWidth
											id="field_short_description"
											name="short_description"
											variant="outlined"
											label={t("new.field_short_description")}
											defaultValue={providerFormik.values.short_description}
											onBlur={providerFormik.handleBlur}
											onChange={providerFormik.handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											error={
												providerFormik.errors.description &&
												providerFormik.touched.description &&
												true
											}
											helperText={
												providerFormik.errors.description &&
												providerFormik.touched.description &&
												providerFormik.errors.description
											}
											fullWidth
											multiline
											rows={4}
											id="field_description"
											name="description"
											variant="outlined"
											label={t("new.field_description")}
											defaultValue={providerFormik.values.description}
											onBlur={providerFormik.handleBlur}
											onChange={providerFormik.handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											error={
												providerFormik.errors.offers &&
												providerFormik.touched.offers &&
												true
											}
											helperText={
												providerFormik.errors.offers &&
												providerFormik.touched.offers &&
												providerFormik.errors.offers
											}
											fullWidth
											id="field_offers"
											name="offers"
											variant="outlined"
											multiline
											rows={4}
											label={t("new.field_offers")}
											defaultValue={providerFormik.values.offers}
											onBlur={providerFormik.handleBlur}
											onChange={providerFormik.handleChange}
										/>
									</Grid>
								</Grid>
							</form>
						) : null}
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography sx={{ mt: 2, mb: 1 }}>
									{t("new.registration_finished")}
								</Typography>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										pt: 2,
									}}
								>
									<Box sx={{ flex: "1 1 auto" }} />
								</Box>
							</React.Fragment>
						) : (
							<React.Fragment>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										pt: 2,
									}}
								>
									<Button
										color="inherit"
										disabled={activeStep === 0}
										onClick={handleBack}
										sx={{ mr: 1 }}
									>
										{t("common:back")}
									</Button>
									<Box sx={{ flex: "1 1 auto" }} />

									<Button onClick={handleNext}>
										{activeStep === steps.length - 1
											? t("common:finish")
											: t("common:next")}
									</Button>
								</Box>
							</React.Fragment>
						)}
					</Box>
				</Paper>
			</BaseTemplate>
		</>
	);
};

export default New;
