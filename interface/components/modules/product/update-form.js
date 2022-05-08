import * as Yup from "yup";
import {
	Grid,
	Autocomplete,
	Switch,
	FormControlLabel,
	Box,
	Button,
	TextField,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import { fetchDestinationByUser } from "../../../services/destinations";
import { useRouter } from "next/router";
import FormSkeleton from "../../elements/skeleton/form";
import Authenticate from "../../../utils/authenticate";
import { getProduct, updateProduct } from "../../../services/products";
import { CountryDetector } from "../../../utils/country";
const Api = require("../../../constants/api.json");

const UpdateForm = (props) => {
	const auth = new Authenticate();
	const router = useRouter();
	const [data, setData] = React.useState();
	const [isLoading, setIsLoading] = React.useState(false);
	const [listOfDestinations, setListOfDestinations] = React.useState([]);
	const { t, lang } = useTranslation("account");

	React.useEffect(() => {
		fetchDestinations();
	}, []);

	React.useEffect(() => {
		fetchData();
	}, [listOfDestinations]);

	const fetchDestinations = async () => {
		setIsLoading(true);
		await fetchDestinationByUser(auth.getUserData().id)
			.then((result) => setListOfDestinations(result.data))
			.catch((error) => {
				alert("Something Wrong Please Try Again");
				router.push("/account/product");
			});
		setIsLoading(false);
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: data ? data.title : "",
			is_persian: data ? data.is_persian : false,
			description: data ? data.description : "",
			destinations: data ? data.destinations : [],
		},
		validationSchema: Yup.object({
			is_persian: Yup.boolean().required(),
			title: Yup.string()
				.required(
					t("validation:field_required", {
						field: t("product.update.input_title"),
					})
				)
				.max(
					1024,
					t("validation:max", {
						field: t("product.update.input_title"),
						num: "1024",
					})
				),
			description: Yup.string().required(
				t("validation:field_required", {
					field: t("product.update.input_description"),
				})
			),
			destinations: Yup.array()
				.min(
					1,
					t("validation:min_items", {
						field: t("product.update.input_destinations"),
						num: "1",
					})
				)
				.max(
					4,
					t("validation:max_items", {
						field: t("product.update.input_destinations"),
						num: "4",
					})
				),
		}),
		onSubmit: async(values) => {
			const promise = values.destinations.map(destination => destination.id).filter(async id =>id )
			values.destinations = await Promise.all(promise);
			let payload = values;
			
			request(payload).then(() =>
				setTimeout(() => {
					router.push("/account/product");
				}, 2500)
			);
		},
	});

	const request = async (payload) => {
		setIsLoading(true);
		updateProduct(router.query.id, payload)
			.then((result) =>
				result.status === 200
					? props.setSnackbar({
							open: true,
							horizontal: "center",
							vertical: "bottom",
							message: t("product.update.success_message"),
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
		if (listOfDestinations.length > 0) {
			await getProduct(router.query.id)
				.then((result) => {
					let list = [];
					result.data.destinations.split(",").forEach((id) => {
						listOfDestinations.forEach((destination) => {
							if (destination.id === parseInt(id)) list.push(destination);
						});
					});
					result.data.destinations = list;
					setData(result.data);
				})
				.catch((error) => {
					alert("something Worng! Please Try again");
					router.push("/account/product");
				});
		}
		setIsLoading(false);
	};

	return (
		<React.Fragment>
			{isLoading ? (
				<FormSkeleton />
			) : (
				<form onSubmit={formik.handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}></Grid>
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
						<Grid item xs={12}>
							<TextField
								error={formik.errors.title && formik.touched.title && true}
								helperText={
									formik.errors.title &&
									formik.touched.title &&
									formik.errors.title
								}
								id="title"
								name="title"
								variant="outlined"
								defaultValue={formik.values.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("product.update.input_title")}
								sx={{ marginBottom: 2 }}
								fullWidth
								required
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
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
								name="description"
								variant="outlined"
								defaultValue={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								label={t("product.update.input_description")}
								multiline
								rows={5}
								sx={{ marginBottom: 2 }}
								fullWidth
								required
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								multiple
								options={listOfDestinations}
								id="destinations"
								filterSelectedOptions
								name="destinations"
								defaultValue={data && data.destinations}
								autoHighlight
								onOpen={formik.handleBlur}
								onChange={(e, value) => {
									let list = [];
									value.map((obj) => {
										list.push(obj.id);
									});
									formik.setFieldValue("destinations", value);
								}}
								getOptionLabel={(option) =>
									CountryDetector(option.country) + " | " + option.city
								}
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
										{CountryDetector(option.country)} | {option.city}
									</Box>
								)}
								renderInput={(params) => (
									<TextField
										error={
											formik.errors.destinations &&
											formik.touched.destinations &&
											true
										}
										helperText={
											formik.errors.destinations &&
											formik.touched.destinations &&
											formik.errors.destinations
										}
										{...params}
										label={t("product.update.input_destinations")}
										fullWidth
										required
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										inputProps={{
											...params.inputProps,
											autoComplete: "destinations", // disable autocomplete and autofill
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" component="div" marginBottom={1}>
								{t("product.update.images_label")}
							</Typography>
							{data &&
								data.images.split(",").map((obj, index) => {
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
							<Typography variant="h6" component="div" marginBottom={1}>
								{t("product.update.attachments_label")}
							</Typography>
							{data &&
								data.attachments.split(",").map((obj, index) => {
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
								{t("product.update.submit_button")}
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
		</React.Fragment>
	);
};

export default UpdateForm;
