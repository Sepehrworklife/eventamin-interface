import {
	CardContent,
	Snackbar,
	Alert,
	Backdrop,
	CircularProgress,
	Typography,
	Button,
	Card,
	Container,
	CardActions,
	Divider,
	TextField,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import styles from "../styles/login/login.module.scss";
import useTranslation from "next-translate/useTranslation";
import Image from 'next/image';
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { login } from "../services/users";
import Authenticate from "../utils/authenticate";
import { useRouter } from "next/router";
import {ActivateUser} from "../components/modules/activate-user";

const Login = (props) => {
	const router = useRouter();
	const { t } = useTranslation("login");
	const auth = new Authenticate();
	const [activateUser, setActivateUser] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [snackbar, setSnackbar] = React.useState({
		horizontal: "center",
		vertical: "top",
		open: false,
		message: null,
		type: "error",
	});

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().required(
				t("validation:field_required", { field: "Username" })
			),
			password: Yup.string().required(
				t("validation:field_required", { field: "Password" })
			),
		}),
		onSubmit: (values) => {
			request(values.username, values.password).then(() =>
				document.querySelector("#login-form").reset()
			);
		},
	});

	const request = async (username, password) => {
		setIsLoading(true);
		await login(username, password)
			.then((result) => {
				auth.setToken(result.data.access_token);
				setSnackbar({
					open: true,
					message: t("login_success"),
					vertical: "top",
					horizontal: "center",
					type: "success",
				});
				setTimeout(() => {
					router.push("/account");
				}, 500);
			})
			.catch((error) =>
				error.response.status === 403
					? setSnackbar({
							open: true,
							message: t("validation:account_not_verified"),
							vertical: "top",
							horizontal: "center",
							type: "error",
					  })
					: setSnackbar({
							open: true,
							message: t("validation:invalid_credentials"),
							vertical: "top",
							horizontal: "center",
							type: "error",
					  })
			);
		setIsLoading(false);
	};



	React.useEffect(() => {
		if (auth.getUserData()) router.push('/account');
		if (router.query.again === 'true') setSnackbar({
			open:true,
			vertical:"top",
			horizontal:"center",
			message:t('try_again_warning'),
			type: 'warning'
		})	
	}, [])

	return (
		<>
		
		
		
			<Head>
				<title>{t("head:login.title")}</title>
				<meta name="description" content={t("head:login.description")}/>
				<meta name="keywords" content={t("head:login.keywords")}/>
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
<p style={{textAlign: "center", marginTop: "2rem"}}>
						<Link href="/">
							<Image
								src="/uploads/images/logo.png"
								alt="Eventamin"
								height="100"
								width="100"
								style={{margin: "auto"}}
							/>
							</Link>
							</p>
					<Card className={styles.card}>
						<CardContent>
							<Typography variant="h4" component="h2">
								{t("section_title")}
							</Typography>
							<Divider light sx={{ my: 2 }} />
							<ActivateUser setParentLoading={setIsLoading} />
							<form
								onSubmit={formik.handleSubmit}
								id="login-form"
							>
								<TextField
									id="username"
									error={
										formik.errors.username &&
										formik.touched.username &&
										true
									}
									helperText={
										formik.errors.username &&
										formik.touched.username &&
										formik.errors.username
									}
									name="username"
									variant="outlined"
									label="Test"
									label={t("input_username")}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									defaultValue={formik.values.username}
									sx={{ marginBottom: 2 }}
									fullWidth
									required
								/>
								<TextField
									error={
										formik.errors.password &&
										formik.touched.password &&
										true
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
									type="password"
									fullWidth
									required
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
						</CardContent>
						<CardActions className={styles.cardAction}>
							<Link href="/register" passHref>
								<Button variant="text" size="small">
									{t("register_link_text")}
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

export default Login;
