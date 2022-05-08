import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Grid, TextField } from "@mui/material";
import Authenticate from "../../../utils/authenticate";
import useTranslation from "next-translate/useTranslation";
import { CountryDetector } from "../../../utils/country";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ContactForm = ({ setFormValues, setActiveStep, activeStep }) => {
	const auth = new Authenticate();
	const { t, lang } = useTranslation("modules");

	// Initial State
	const [user, setUser] = React.useState(auth.getUserData());

	// Inital Form
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: user ? `${user.name} | ${user.name_fa}` : "",
			email: user ? user.email : "",
			company: user ? `${user.company} | ${user.company_fa}` : "",
			phone: user ? user.phone : "",
			country: user ? CountryDetector(user.country, lang) : "",
			job: user ? user.job : "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required(t("validation:field_required")),
			email: Yup.string().required(t("validation:field_required")).email(),
			company: Yup.string().required(t("validation:field_required")),
			country: Yup.string().required(t("validation:field_required")),
			job: Yup.string().required(t("validation:field_required")),
			phone: Yup.string()
				.matches(phoneRegExp, t("validation:invalid_phone"))
				.required(t("validation:field_required")),
		}),
		onSubmit: (values) => {
			setFormValues(values);
			setActiveStep(activeStep + 1);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<TextField
						error={formik.errors.name && formik.touched.name && true}
						helperText={
							formik.errors.name && formik.touched.name && formik.errors.name
						}
						id="field_name"
						name="name"
						variant="outlined"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						fullWidth
						defaultValue={formik.values.name}
						label={t("requests.contactform.name_label")}
						required
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						error={formik.errors.email && formik.touched.email && true}
						helperText={
							formik.errors.email && formik.touched.email && formik.errors.email
						}
						id="field_email"
						name="email"
						variant="outlined"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						fullWidth
						defaultValue={formik.values.email}
						label={t("requests.contactform.email_label")}
						required
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						error={formik.errors.phone && formik.touched.phone && true}
						helperText={
							formik.errors.phone && formik.touched.phone && formik.errors.phone
						}
						id="field_phone"
						name="phone"
						variant="outlined"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						fullWidth
						defaultValue={formik.values.phone}
						label={t("requests.contactform.phone_label")}
						required
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						error={formik.errors.country && formik.touched.country && true}
						helperText={
							formik.errors.country &&
							formik.touched.country &&
							formik.errors.country
						}
						name="country"
						variant="outlined"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						fullWidth
						defaultValue={formik.values.country}
						label={t("requests.contactform.country_label")}
						required
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
						id="field_company"
						name="company"
						variant="outlined"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						fullWidth
						defaultValue={formik.values.company}
						label={t("requests.contactform.company_label")}
						required
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						error={formik.errors.job && formik.touched.job && true}
						helperText={
							formik.errors.job && formik.touched.job && formik.errors.job
						}
						id="field_job"
						name="job"
						variant="outlined"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						fullWidth
						defaultValue={formik.values.job}
						label={t("requests.contactform.job_label")}
						required
					/>
				</Grid>
				<Grid item>
					<Button color="primary" size="large" onClick={formik.submitForm}>
						{t("common:next")}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default ContactForm;
