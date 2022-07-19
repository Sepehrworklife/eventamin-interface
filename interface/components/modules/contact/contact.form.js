import { Button, Grid, TextField, LinearProgress, Alert } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSendSingleEmail } from "../../../hooks/email.hook";

const ContactForm = ({ t }) => {
  const [sendEmail, response, loading, error] = useSendSingleEmail();
  const formik = useFormik({
    initialValues: {
      email: "",
      title: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("validation:uncorrect_email"))
        .required(t("validation:field_required")),
      title: Yup.string().required(t("validation:field_required")),
      message: Yup.string().required(t("validation:field_required")),
    }),
    onSubmit: (values) => {
      sendEmail({
        email: "info@eventamin.com",
        subject: `CONTACT FORM: ${values.title}`,
        body: `email: ${values.email}<br /><br /> ${values.message}`,
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {loading && <LinearProgress sx={{ mb: 4 }} />}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {t("contact.form.error")}
        </Alert>
      )}
      {response.status === 200 && (
        <Alert severity="success" sx={{ mb: 4 }}>
          {t("contact.form.success")}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={t("contact.form.email")}
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={t("contact.form.title")}
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && formik.errors.title ? true : false}
            helperText={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="textarea"
            fullWidth
            name="message"
            label={t("contact.form.message")}
            rows={4}
            multiline
            error={
              formik.touched.message && formik.errors.message ? true : false
            }
            helperText={
              formik.touched.message && formik.errors.message
                ? formik.errors.message
                : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {t("common:finish")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
