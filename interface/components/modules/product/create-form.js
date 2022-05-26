import * as Yup from "yup";
import {
	Grid,
	Autocomplete,
	Box,
	Button,
	TextField,
	Switch,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Typography,
	Alert,
	Snackbar,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import UploadField from "../../elements/upload";
import { fetchDestinationByUser } from "../../../services/destinations";
import { useRouter } from "next/router";
import FormSkeleton from "../../elements/skeleton/form";
import Authenticate from "../../../utils/authenticate";
import { CountryDetector } from "../../../utils/country";
import { createProduct } from "../../../services/products";

const CreateForm = () => {
	const auth = new Authenticate();
	const [listOfDestinations, setListOfDestinations] = React.useState([]);
	const router = useRouter();
	const [serviceCategories, setServiceCategories] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const { t, lang } = useTranslation("account");
	const [attachments, setAttachments] = React.useState([]);
	const [images, setImages] = React.useState([]);
	const [snackbar, setSnackbar] = React.useState({
		horizontal: "center",
		vertical: "top",
		open: false,
	});

	React.useEffect(() => {
		fetchDestinations();
	}, []);

	const fetchDestinations = async () => {
		setIsLoading(true);
		await fetchDestinationByUser(auth.getUserData().id)
			.then((result) => setListOfDestinations(result.data))
			.catch((error) => {
				if(lang === "fa") {
				alert("لطفا ابتدا از قسمت مقصد ها، مقصد درست بفرمایید");
				}
				else {
					alert("You have no destinations, please create one first.")
				}
				router.push('/account/product')
			});
		setIsLoading(false);
	};

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			is_persian: false,
			destinations: "",
			attachments: [],
			images: [],
		},
		validationSchema: Yup.object({
			is_persian: Yup.boolean().required(),
			title: Yup.string()
				.required(
					t("validation:field_required", {
						field: t("product.create.input_title"),
					})
				)
				.max(
					1024,
					t("validation:max", {
						field: t("product.create.input_title"),
						num: "1024",
					})
				),
			description: Yup.string().required(
				t("validation:field_required", {
					field: t("product.create.input_description"),
				})
			),
			destinations: Yup.array()
				.min(
					1,
					t("validation:min_items", {
						field: t("product.create.input_destinations"),
						num: "1",
					})
				)
				.max(
					4,
					t("validation:max_items", {
						field: t("product.create.input_destinations"),
						num: "4",
					})
				),
		}),
		onSubmit: (values) => {
			let payload = values;
			payload["user_id"] = auth.getUserData().id;
			if (attachments.length > 0) {
				let list = [];
				attachments.map((obj) => list.push("uploads/" + obj.id));
				payload.attachments = list;
			}
			if (images.length > 0) {
				let list = [];
				images.map((obj) => list.push("uploads/" + obj.id));
				payload.images = list;
			}
			request(payload).then(() =>
				setTimeout(() => {
					router.push("/account/product");
				}, 2500)
			);
		},
	});

	const request = async (payload) => {
		setIsLoading(true);
		createProduct(payload)
			.then((result) =>
				result.status === 201
					? setSnackbar({
							open: true,
							horizontal: "center",
							vertical: "bottom",
							message: t("product.create.success_message"),
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
								label={t("product.create.input_title")}
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
								label={t("product.create.input_description")}
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
								id="destinations"
								filterSelectedOptions
								name="destinations"
								options={listOfDestinations}
								autoHighlight
								onOpen={formik.handleBlur}
								onChange={(e, value) => {
									let list = [];
									value.map((obj) => {
										list.push(obj.id);
									});
									formik.setFieldValue("destinations", list);
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
										label={t("product.create.input_destinations")}
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
						<Grid item xs={12} sx={{ display: "flex", minHeight: "120px" }}>
							<UploadField
								setUpload={setImages}
								fileType={["image/jpeg", "image/png"]}
								maxLength={4}
								fileSize={1}
								buttonVariant="outlined"
								buttonFullWidth={true}
								buttonSize="large"
								buttonText={t("product.create.input_images")}
								buttonColor={formik.errors.uploads ? "error" : "primary"}
								inputID="images"
								inputName="images"
								accept="image/png,image/jpeg"
								multiple={true}
							/>
							{formik.errors.images && formik.touched.images ? (
								<FormHelperText error={true}>
									{formik.errors.images}
								</FormHelperText>
							) : null}
						</Grid>
						<Grid item xs={12} sx={{ display: "flex", minHeight: "120px" }}>
							<UploadField
								setUpload={setAttachments}
								fileType={["application/pdf", "video/mp4"]}
								maxLength={4}
								fileSize={3}
								buttonVariant="outlined"
								buttonFullWidth={true}
								buttonSize="large"
								buttonText={t("product.create.input_attachments")}
								buttonColor={formik.errors.uploads ? "error" : "primary"}
								inputID="attachments"
								inputName="attachments"
								accept="application/pdf,video/mp4"
								multiple={true}
							/>
							{formik.errors.attachments && formik.touched.attachments ? (
								<FormHelperText error={true}>
									{formik.errors.attachments}
								</FormHelperText>
							) : null}
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								fullWidth
								size="large"
								onClick={() => formik.submitForm()}
							>
								{t("product.create.submit_button")}
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
		</React.Fragment>
	);
};

export default CreateForm;
