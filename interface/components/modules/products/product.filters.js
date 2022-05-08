import {
	MenuItem,
	FormControl,
	FormControlLabel,
	Switch,
	Select,
	InputLabel,
	Box,
	Autocomplete,
	TextField,
	Grid,
	Button,
	Typography,
} from "@mui/material";
import React from "react";
import { countries } from "../../../constants/countries";
import * as Yup from "yup";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import SearchIcon from "@mui/icons-material/Search";

export const ProductFilters = ({ setFilters, isPersian, setIsPersian, setProducts, data }) => {
	const { t, lang } = useTranslation("products");

	// Initial Formik
	const formik = useFormik({
		initialValues: {
			country: "",
			keywords: "",
		},
		onSubmit: (values) => {
			setFilters(values);
		},
	});

	function handleSwitch() {
		const languageStatus = !isPersian;
		setIsPersian(!isPersian);
		const switchLanguage = data.filter(
			(product) => product.is_persian == languageStatus
		);
		setProducts(switchLanguage);
	}

	return (
		<>
			<Typography
				variant="h4"
				component="div"
				textAlign="center"
				marginBottom={1}
			>
				{t("filters.title")}
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={1} columns={14}>
					<Grid item xs={14} md={4}>
						<Autocomplete
							id="country"
							name="country"
							options={countries}
							autoHighlight
							onOpen={formik.handleBlur}
							onChange={(e, value) =>
								formik.setFieldValue("country", value ? value.code : "")
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
									label={t("filters.country_label")}
									fullWidth
									variant="filled"
									size="small"
									required
									inputProps={{
										...params.inputProps,
										autoComplete: "country", // disable autocomplete and autofill
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={14} md={9}>
						<TextField
							size="small"
							error={formik.errors.keywords && formik.touched.keywords && true}
							helperText={
								formik.errors.keywords &&
								formik.touched.keywords &&
								formik.errors.keywords
							}
							id="keywords"
							name="keywords"
							variant="filled"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							label={t("filters.keywords_label")}
							fullWidth
							required
							type="text"
						/>
					</Grid>

					<Grid
						item
						xs={14}
						md={1}
						sx={{ alignItems: "center", display: "flex" }}
					>
						<Button
							disabled={
								!formik.values.country && !formik.values.keywords && true
							}
							variant="outlined"
							fullWidth
							size="large"
							onClick={formik.submitForm}
						>
							<SearchIcon />
						</Button>
					</Grid>
					<Grid item xs={14}>
						<FormControlLabel
							control={<Switch checked={isPersian} onChange={handleSwitch} />}
							label={isPersian ? t("common:persian") : t("common:english")}
						/>
					</Grid>
				</Grid>
			</form>
		</>
	);
};
