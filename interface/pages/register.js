import {
	CardContent,
	Typography,
	Button,
	Card,
	Container,
	CardActions,
	Divider,
	TextField,
	Backdrop,
	CircularProgress,
	Snackbar,
	Alert,
	Box,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import styles from "../styles/register/register.module.scss";
import useTranslation from "next-translate/useTranslation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { sendActivationEmail } from "../services/users";
import { base } from "../services/users";

const Register = (props) => {
	const initialOtpCount = 120;
	const { t } = useTranslation("register");
	const [isLoading, setIsLoading] = React.useState(false);
	const [otpCount, setOtpCount] = React.useState(initialOtpCount);
	const [user, setUser] = React.useState([]);
	const [resendOtp, setResendOtp] = React.useState(false);
	const [snackbar, setSnackbar] = React.useState({
		horizontal: "center",
		vertical: "top",
		open: false,
		message: null,
		type: "error",
	});

	function startCount() {
		const realSecond = otpCount;
		let otp = setInterval(() => {
			realSecond -= 1;
			if (realSecond >= 0) {
				setOtpCount((prevState) => prevState - 1);
			}
			if (realSecond < 0) {
				clearInterval(otp);
			}
		}, [1000]);
	}

	async function sendOtpRequest() {
		await sendActivationEmail(user.username, user.id, user.email)
			.then((result) =>
				setSnackbar({
					open: true,
					horizontal: "center",
					vertical: "top",
					message: "Verification email resended",
					type: "success",
				})
			)
			.catch((error) =>
				setSnackbar({
					open: true,
					horizontal: "center",
					vertical: "top",
					message: "Something wrong please try again later.",
					type: "error",
				})
			);
		setOtpCount(initialOtpCount);
		setTimeOut(() => startCount(), [500]);
	}

	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const formik = useFormik({
		initialValues: {
			name: "",
			name_fa: "",
			phone: "",
			email: "",
			username: "",
			password: "",
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required(t("validation:field_required", { field: "Name" }))
				.max(128, t("validation:max", { field: "Name", num: "128" })),
			name_fa: Yup.string().max(
				128,
				t("validation:max", { field: "Persian Name", num: "128" })
			),
			phone: Yup.string()
				.matches(phoneRegExp, t("validation:invalid_phone"))
				.required(t("validation:field_required", { field: "Phone" })),
			email: Yup.string()
				.email(t("validation:uncorrect_email"))
				.required(t("validation:field_required", { field: "Email" })),
			username: Yup.string()
				.max(32, t("validation:max", { field: "Username", num: "32" }))
				.min(4, t("validation:min", { field: "Username", num: "4" }))
				.required(t("validation:field_required", { field: "Username" })),
			password: Yup.string()
				.max(32, t("validation:max", { field: "Password", num: "32" }))
				.min(6, t("validation:min", { field: "Password", num: "6" }))
				.required(t("validation:field_required", { field: "Password" })),
		}),
		onSubmit: (values) => {
			let payload = values;
			payload["is_verified"] = false;
			payload["is_superuser"] = false;
			request(payload).then(() =>
				document.querySelector("#register-form").reset()
			);
			setResendOtp(true);
			startCount();
		},
	});

	const request = async (payload) => {
		setIsLoading(true);
		base("post", payload)
			.then((result) => {
				if (result.status === 201) {
					setSnackbar({
						open: true,
						horizontal: "center",
						vertical: "top",
						message: t("registered_success"),
						type: "success",
					});
					setUser(result.data.user);
				}
			})
			.catch((error) =>
				error.response.status === 406
					? setSnackbar({
							open: true,
							horizontal: "center",
							vertical: "top",
							message: t("unique_entry_exists_error"),
							type: "error",
					  })
					: setSnackbar({
							open: true,
							horizontal: "center",
							vertical: "top",
							message: t("validation:something_wrong"),
							type: "error",
					  })
			);
		setIsLoading(false);
	};

	return (
		<>
			<Head>
				<title>{t("head:register.title")}</title>
				<meta name="description" content={t("head:register.description")} />
				<meta name="keywords" content={t("head:register.keywords")} />
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
				<CircularProgress color="inherit" />
			</Backdrop>
			<div className={styles.background}>
				<Container maxWidth="sm" className={styles.container}>
					<Card className={styles.card}>
						<CardContent>
							<Typography variant="h4" component="h2">
								{t("section_title")}
							</Typography>
							<Divider light sx={{ my: 2 }} />
							<form onSubmit={formik.handleSubmit} id="register-form">
								<TextField
									error={formik.errors.name && formik.touched.name && true}
									helperText={
										formik.errors.name &&
										formik.touched.name &&
										formik.errors.name
									}
									id="name"
									name="name"
									variant="outlined"
									defaultValue={formik.values.name}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									label={t("input_name")}
									sx={{ marginBottom: 2 }}
									fullWidth
									required
								/>
								<TextField
									dir="rtl"
									error={
										formik.errors.name_fa && formik.touched.name_fa && true
									}
									helperText={
										formik.errors.name_fa &&
										formik.touched.name_fa &&
										formik.errors.name_fa
									}
									id="name_fa"
									name="name_fa"
									variant="outlined"
									defaultValue={formik.values.name_fa}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									label={t("input_name_fa")}
									sx={{ marginBottom: 2 }}
									fullWidth
								/>
								<TextField
									error={formik.errors.phone && formik.touched.phone && true}
									helperText={
										formik.errors.phone && formik.touched.phone
											? formik.errors.phone
											: t("phone_helper_text")
									}
									id="phone"
									name="phone"
									variant="outlined"
									defaultValue={formik.values.phone}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									label={t("input_phone")}
									sx={{ marginBottom: 2 }}
									fullWidth
									required
								/>
								<TextField
									error={formik.errors.email && formik.touched.email && true}
									helperText={
										formik.errors.email &&
										formik.touched.email &&
										formik.errors.email
									}
									id="email"
									name="email"
									variant="outlined"
									defaultValue={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									label={t("input_email")}
									sx={{ marginBottom: 2 }}
									fullWidth
									required
								/>
								<TextField
									error={
										formik.errors.username && formik.touched.username && true
									}
									helperText={
										formik.errors.username &&
										formik.touched.username &&
										formik.errors.username
									}
									id="username"
									name="username"
									variant="outlined"
									defaultValue={formik.values.username}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									label={t("input_username")}
									sx={{ marginBottom: 2 }}
									fullWidth
									required
								/>

								<TextField
									error={
										formik.errors.password && formik.touched.password && true
									}
									helperText={
										formik.errors.password &&
										formik.touched.password &&
										formik.errors.password
									}
									id="password"
									name="password"
									variant="outlined"
									defaultValue={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									label={t("input_password")}
									sx={{ marginBottom: 2 }}
									fullWidth
									required
									type="password"
								/>
								<Button
									disabled={!formik.isValid && true}
									variant="contained"
									fullWidth
									type="submit"
									size="large"
								>
									{t("submit_button_text")}
								</Button>
							</form>
							{resendOtp && (
								<Box sx={{ my: 2 }}>
									<Typography>
										{t("didnt_receive_email")}{" "}
										<Button
											size="sm"
											onClick={sendOtpRequest}
											disabled={otpCount !== 0 ? true : false}
										>
											{otpCount === 0 ? t("resend") : otpCount + t("seconds")}
										</Button>{" "}
									</Typography>
									<Typography>{t("check_spam")}</Typography>
								</Box>
							)}
						</CardContent>
						<CardActions className={styles.cardAction}>
							<Link href="/login" passHref>
								<Button variant="text" size="small">
									{t("login_link_text")}
								</Button>
							</Link>
							<Link href="/" passHref>
								<Button variant="text" size="small">
									{t("home_link_text")}
								</Button>
							</Link>
						</CardActions>
					</Card>
				</Container>
			</div>
		</>
	);
};

export default Register;
