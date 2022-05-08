import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { Grid, TextField, FormHelperText, Button } from "@mui/material";
import UploadField from "../../elements/upload";

const GeneralForm = ({
	setFormValues,
	setActiveStep,
	activeStep,
	formValues,
}) => {
	// Hooks
	const { t, lang } = useTranslation('modules');

	//Initial States
	const [uploads, setUploads] = React.useState([]);

	// Initial Formik
	const formik = useFormik({
		initialValues: {
			description: "",
			attachments: [],
		},
		validationSchema: Yup.object({
			description: Yup.string().required(t('validation:field_required')),
		}),
		onSubmit: (values) => {
			let payload = values;
			if (uploads.length > 0) {
				let listOfAttachments = [];
				uploads.map((obj) => listOfAttachments.push(`uploads/${obj.id}`));
				payload.attachments = listOfAttachments;
			}

			Object.keys(formValues).forEach((key) => {
				payload[key] = formValues[key];
			});
			setFormValues(payload);
			setActiveStep(activeStep + 1);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						error={
							formik.errors.description && formik.touched.description && true
						}
						helperText={
							formik.errors.description &&
							formik.touched.description &&
							formik.errors.description
						}
						id="field_description"
						name="description"
						variant="outlined"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						type="text"
						defaultValue={formik.values.description}
						label={t("requests.general.form.description_label")}
						required
						multiline
						fullWidth
						rows={4}
					/>
				</Grid>

				<Grid item xs={12}>
					<UploadField
						setUpload={setUploads}
						fileType={[
							"image/jpeg",
							"image/png",
							"application/pdf",
							"video/mp4",
						]}
						maxLength={4}
						fileSize={2}
						buttonVariant="outlined"
						buttonFullWidth={true}
						buttonSize="large"
						buttonText={t("requests.general.form.attachments_label")}
						buttonColor={formik.errors.attachments ? "error" : "primary"}
						inputID="attachments_label"
						inputName="attachments"
						accept="image/*,application/pdf,video/mp4"
						multiple={true}
					/>
					{formik.errors.attachments && formik.touched.attachments ? (
						<FormHelperText error={true}>
							{formik.errors.attachments}
						</FormHelperText>
					) : null}
				</Grid>
				<Grid item>
					<Button color="primary" size="large" onClick={formik.submitForm}>
						{t("common:finish")}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default GeneralForm;
