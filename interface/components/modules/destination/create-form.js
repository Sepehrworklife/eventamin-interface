import * as Yup from "yup";
import Head from "next/head";
import {
  Grid,
  FormControl,
  FormLabel,
  Switch,
  Autocomplete,
  Box,
  FormHelperText,
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
import { fetchLanguages } from "../../../utils/language";
import { countries } from "../../../constants/countries";
import useTranslation from "next-translate/useTranslation";
import UploadField from "../../elements/upload";
import { services } from "../../../constants/service-categories";
import { createDestination } from "../../../services/destinations";
import { useRouter } from "next/router";
import FormSkeleton from "../../elements/skeleton/form";
import Authenticate from "../../../utils/authenticate";

const CreateForm = () => {
  const auth = new Authenticate();
  const [listLanguages, setListLanguages] = React.useState([]);
  const router = useRouter();
  const [serviceCategories, setServiceCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { t, lang } = useTranslation("account");
  const [uploads, setUploads] = React.useState([]);
  const [snackbar, setSnackbar] = React.useState({
    horizontal: "center",
    vertical: "top",
    open: false,
  });

  React.useEffect(() => {
    setListLanguages(fetchLanguages());
  }, []);

  const formik = useFormik({
    initialValues: {
      country: "",
      city: "",
      languages: "",
      is_persian: false,
      category: [],
      uploads: "",
    },
    validationSchema: Yup.object({
      is_persian: Yup.boolean().required(),
      country: Yup.string().required(
        t("validation:field_required", {
          field: t("destination.create.input_country"),
        })
      ),
      city: Yup.string().required(
        t("validation:field_required", {
          field: t("destination.create.input_city"),
        })
      ),
      category: Yup.array().max(3),
      languages: Yup.string().required(
        t("validation:field_required", {
          field: t("destination.create.input_languages"),
        })
      ),
      uploads: Yup.string(),
    }),
    onSubmit: (values) => {
      let payload = values;
      payload["user_id"] = auth.getUserData().id;
			if (values.category.length > 0)
        payload.category = payload.category.join(",");
      if (uploads.length > 0) {
        let list = [];
        uploads.map((obj) => list.push("uploads/" + obj.id));
        payload.uploads = list.join();
      }
      request(payload).then(() =>
        setTimeout(() => {
          router.push("/account/destination");
        }, 2500)
      );
    },
  });

  const request = async (payload) => {
    setIsLoading(true);
    createDestination(payload)
      .then((result) =>
        result.status === 201
          ? setSnackbar({
              open: true,
              horizontal: "center",
              vertical: "bottom",
              message: t("destination.create.success_message"),
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

  function categoryOnChange(e, obj) {}

  return (
    <React.Fragment>
      <Head>
        <title>{t("head:account.destinations.title")}</title>
        <meta
          name="description"
          content={t("head:account.destinations.description")}
        />
        <meta
          name="keywords"
          content={t("head:account.destinations.keywords")}
        />
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
                    label={t("destination.create.input_country")}
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
                label={t("destination.create.input_city")}
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
                filterSelectedOptions
                name="languages"
                options={listLanguages}
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
                    label={t("destination.create.input_languages")}
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
                buttonText={t("destination.create.input_uploads")}
                buttonColor={formik.errors.uploads ? "error" : "primary"}
                inputID="uploads"
                inputName="uploads"
                accept="image/*,application/pdf,video/mp4"
                multiple={true}
              />
              {formik.errors.uploads && formik.touched.uploads ? (
                <FormHelperText error={true}>
                  {formik.errors.uploads}
                </FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <FormControl error={formik.errors.category}>
                <FormLabel>
                  {t("destination.create.input_service_categories")}
                </FormLabel>
                {formik.errors.category && (
                  <FormHelperText error={true}>
                    {formik.errors.category}
                  </FormHelperText>
                )}
                <FormGroup row>
                  {services.map((obj, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        label={lang === "fa" ? obj.fa : obj.en}
                        control={
                          <Checkbox
                            value={obj.code}
                            name="category"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        }
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => formik.submitForm()}
              >
                {t("destination.create.submit_button")}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </React.Fragment>
  );
};

export default CreateForm;
