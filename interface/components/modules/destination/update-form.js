import * as Yup from "yup";
import {
	Switch,
	Grid,
	Autocomplete,
	Box,
	Button,
	TextField,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Typography,
	Alert,
	Snackbar,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { convertLanguages, fetchLanguages } from "../../../utils/language";
import { countries } from "../../../constants/countries";
import useTranslation from "next-translate/useTranslation";
import { services } from "../../../constants/service-categories";
import {
	getDestination,
	updateDestination,
} from "../../../services/destinations";
import { useRouter } from "next/router";
import FormSkeleton from "../../elements/skeleton/form";
import Authenticate from "../../../utils/authenticate";
const Api = require("../../../constants/api.json");

const UpdateForm = (props) => {
	const auth = new Authenticate();
	const [listLanguages, setListLanguages] = React.useState([]);
	const router = useRouter();
	const [data, setData] = React.useState(null);
	const [serviceCategories, setServiceCategories] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const { t, lang } = useTranslation("account");

	React.useEffect(() => {
		setListLanguages(fetchLanguages());
		fetchData();
	}, []);

	const serviceCategoriesHandler = (e) => {
		if (e.target.checked) {
			setServiceCategories((prev) => [...prev, e.target.value]);
		} else {
			let initial = serviceCategories;
			initial = initial.filter((value) => value != e.target.value);
			setServiceCategories(initial);
		}
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			country: data ? data.country : "",
			is_persian: data ? data.is_persian : false,
			city: data ? data.city : "",
			languages: data ? data.languages : "",
			category: data ? data.category : "",
		},
		validationSchema: Yup.object({
			country: Yup.string().required(
				t("validation:field_required", {
					field: t("destination.update.input_country"),
				})
			),
			city: Yup.string().required(
				t("validation:field_required", {
					field: t("destination.update.input_city"),
				})
			),
			languages: Yup.string().required(
				t("validation:field_required", {
					field: t("destination.update.input_languages"),
				})
			),
		}),
		onSubmit: (values) => {
			let payload = values;
			if (serviceCategories.length > 0)
				payload.category = serviceCategories.join();
			request(payload).then(() =>
				setTimeout(() => {
					router.push("/account/destination");
				}, 2500)
			);
		},
	});

	const request = async (payload) => {
		setIsLoading(true);
		updateDestination(router.query.id, payload)
			.then((result) =>
				result.status === 200
					? props.setSnackbar({
							open: true,
							horizontal: "center",
							vertical: "bottom",
							message: t("destination.update.success_message"),
							type: "success",
					  })
					: null
			)
			.then(() => setIsLoading(false))
			.catch((error) =>
				props.setSnackbar({
					open: true,
					horizontal: "center",
					vertical: "top",
					message: t("validation:something_wrong"),
					type: "error",
				})
			);
	};

	const fetchData = async () => {
		setIsLoading(true);
		await getDestination(router.query.id)
			.then((result) => {
				setData(result.data);
				setServiceCategories(result.data.category.split(","));
			})
			.catch((error) => {
				alert("something wrong" + error.response.status);
			});
		setIsLoading(false);
	};

	return (
		<React.Fragment>
			{isLoading ? (
				<FormSkeleton />
			) : (
				<form onSubmit={formik.handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Switch
										checked={formik.values.is_persian}
										onChange={() =>
											formik.setFieldValue(
												"is_persian",
												!formik.values.is_persian
											)
										}
										name="is_persian"
									/>
								}
								label={
									formik.values.is_persian
										? t("product.create.input_ispersian")
										: t("product.create.input_isenglish")
								}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id="country"
								name="country"
								options={countries}
								autoHighlight
								defaultValue={
									countries.filter(
										(obj) => obj.code === formik.values.country
									)[0]
								}
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
											formik.errors.country && formik.touched.country && true
										}
										helperText={
											formik.errors.country &&
											formik.touched.country &&
											formik.errors.country
										}
										{...params}
										label={t("destination.update.input_country")}
										fullWidth
										required
										inputProps={{
											...params.inputProps,
											autoComplete: "country", // disable autocomplete and autofill
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
								id="city"
								name="city"
								variant="outlined"
								defaultValue={formik.values.city}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("destination.update.input_city")}
								sx={{ marginBottom: 2 }}
								fullWidth
								required
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								multiple
								id="languages"
								name="languages"
								options={listLanguages}
								filterSelectedOptions
								defaultValue={convertLanguages(
									formik.values.languages.split(",")
								)}
								autoHighlight
								onOpen={formik.handleBlur}
								onChange={(e, value) => {
									let list = [];
									value.map((obj) => {
										list.push(obj.code);
									});
									formik.setFieldValue("languages", list.join());
								}}
								getOptionLabel={(option) => option.lang}
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
										{option.lang}
									</Box>
								)}
								renderInput={(params) => (
									<TextField
										error={
											formik.errors.languages &&
											formik.touched.languages &&
											true
										}
										helperText={
											formik.errors.languages &&
											formik.touched.languages &&
											formik.errors.languages
										}
										{...params}
										label={t("destination.update.input_languages")}
										fullWidth
										required
										inputProps={{
											...params.inputProps,
											autoComplete: "languages", // disable autocomplete and autofill
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" component="div">
								{t("destination.update.input_service_categories")}
							</Typography>
							<FormGroup row>
								{services.map((obj, index) => {
									return (
										<FormControlLabel
											key={index}
											control={
												<Checkbox
													defaultChecked={
														formik.values.category.split(",").includes(obj.code)
															? true
															: false
													}
													value={obj.code}
													onChange={serviceCategoriesHandler}
												/>
											}
											label={lang === "fa" ? obj.fa : obj.en}
										/>
									);
								})}
							</FormGroup>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" component="div" marginBottom={1}>
								{t("destination.update.file_uploaded_label")}
							</Typography>
							{data &&
								data.uploads.split(",").map((obj, index) => {
									return (
										<a href={Api.url + obj} key={index} target="_blank">
											<Button variant="outlined" sx={{ mx: 1 }}>
												{index + 1}
											</Button>
										</a>
									);
								})}
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								fullWidth
								size="large"
								onClick={() => formik.submitForm()}
							>
								{t("destination.update.submit_button")}
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
		</React.Fragment>
	);
};

export default UpdateForm;
