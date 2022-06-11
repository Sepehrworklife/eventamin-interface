import {
	Box,
	Button,
	Grid,
	TextField,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useTranslation from "next-translate/useTranslation";
import {
	LocalizationProvider,
	MobileDatePicker,
	MobileDateRangePicker,
} from "@mui/lab";
import DateFnsAdapter from "@mui/lab/AdapterDateFns";
import AdapterJalali from "@date-io/date-fns-jalali";

const ProjectForm = ({
	setFormValues,
	setActiveStep,
	activeStep,
	formValues,
}) => {
	const { t, lang } = useTranslation("modules");

	// Initial States

	// Initial Formik
	const formik = useFormik({
		initialValues: {
			duration: "",
			budget: "",
			guests_amount: "",
			start_date: "",
			end_date: "",
			destinations: "",
			attendees: "organization",
		},
		validationSchema: Yup.object({
			duration: Yup.number()
				.positive()
				.required(t("validation:field_required")),
			budget: Yup.number().positive().required(t("validation:field_required")),
			guests_amount: Yup.number()
				.positive()
				.required(t("validation:field_required")),
			start_date: Yup.date().required(t("validation:field_required")),
			end_date: Yup.date().required(t("validation:field_required")),
			destinations: Yup.string().required(t("validation:field_required")),
			attendees: Yup.string().required(t("validation:field_required")),
		}),
		onSubmit: (values) => {
			Object.keys(formValues).forEach((key) => {
				values[key] = formValues[key];
			});
			setFormValues(values);
			setActiveStep(activeStep + 1);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="attendees_label">
							{t("requests.project.form.attendees_label")}
						</InputLabel>
						<Select
							labelId="attendees_label"
							id="attendees"
							name="attendees"
							value={formik.values.attendees}
							label={t("requests.project.form.attendees_label")}
							onChange={(event) => {
								formik.setFieldValue("attendees", event.target.value);
							}}
						>
							<MenuItem value="organization">
								{t("requests.project.form.organization")}
							</MenuItem>
							<MenuItem value="individual">
								{t("requests.project.form.individual")}
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12}>
					<TextField
						error={
							formik.errors.destinations && formik.touched.destinations && true
						}
						helperText={
							formik.errors.destinations &&
							formik.touched.destinations &&
							formik.errors.destinations
						}
						id="field_destinations"
						name="destinations"
						variant="outlined"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						type="text"
						defaultValue={formik.values.destinations}
						label={t("requests.project.form.destinations_label")}
						required
						multiline
						fullWidth
						rows={4}
					/>
				</Grid>

				<Grid item xs={12}>
					<LocalizationProvider
						dateAdapter={lang === "fa" ? AdapterJalali : DateFnsAdapter}
					>
						<MobileDateRangePicker
							startText={t("requests.project.form.start_date_label")}
							endText={t("requests.project.form.end_date_label")}
							value={[formik.values.start_date, formik.values.end_date]}
							onChange={(newValue) => {
								formik.setFieldValue("start_date", newValue[0]);
								formik.setFieldValue("end_date", newValue[1]);
							}}
							renderInput={(startProps, endProps) => (
								<>
									<TextField {...startProps} fullWidth />
									<Box sx={{ mx: 1 }}> {lang === "fa" ? "تا" : "To"} </Box>
									<TextField {...endProps} fullWidth />
								</>
							)}
						/>
					</LocalizationProvider>
				</Grid>

				<Grid item xs={12} md={6}>
					<TextField
						error={formik.errors.duration && formik.touched.duration && true}
						helperText={
							formik.errors.duration &&
							formik.touched.duration &&
							formik.errors.duration
						}
						id="field_duration"
						name="duration"
						variant="outlined"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						type="number"
						fullWidth
						defaultValue={formik.values.duration}
						label={t("requests.project.form.duration_label")}
						required
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						error={formik.errors.budget && formik.touched.budget && true}
						helperText={
							formik.errors.budget &&
							formik.touched.budget &&
							formik.errors.budget
						}
						id="field_budget"
						name="budget"
						variant="outlined"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						type="number"
						fullWidth
						defaultValue={formik.values.budget}
						label={t("requests.project.form.budget_label")}
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						error={
							formik.errors.guests_amount &&
							formik.touched.guests_amount &&
							true
						}
						helperText={
							formik.errors.guests_amount &&
							formik.touched.guests_amount &&
							formik.errors.guests_amount
						}
						id="field_guests_amount"
						name="guests_amount"
						variant="outlined"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						type="number"
						fullWidth
						defaultValue={formik.values.guests_amount}
						label={t("requests.project.form.guests_amount_label")}
						required
					/>
				</Grid>

				<Grid item>
					<Button color="primary" variant="contained" size="large" onClick={formik.submitForm}>
						{t("common:next")}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default ProjectForm;
