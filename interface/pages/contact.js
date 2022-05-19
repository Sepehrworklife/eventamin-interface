import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import Head from "next/head";
import { FooterOne } from "../components/layouts/footer/one";
import MainNavbar from "../components/layouts/navbar/main";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import useTranslation from "next-translate/useTranslation";

const Contact = () => {
	const { t,lang } = useTranslation("about");
	return (
		<>
			
			<Head>
				<title>{t("head:contact.title")}</title>
				<meta name="description" content={t("head:contact.description")}/>
				<meta name="keywords" content={t("head:contact.keywords")}/>
			</Head>
			<MainNavbar />
			<Container maxWidth="lg" sx={{ my: 8 }}>
				<Grid
					container
					spacing={4}
					sx={{ display: "flex", alignItems: "center" }}
				>
					<Grid item xs={12} md={4}>
						<Card>
							<CardContent
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
								}}
							>
								<MailOutlineIcon sx={{ fontSize: 148 }} color="disabled" />
								<Typography
									sx={{ fontSize: 14 }}
									color="text.secondary"
									gutterBottom
								>
									{t("contact.sub_head")}
								</Typography>
								<Typography variant="h5" component="div" fontWeight="600">
									{t("contact.email_title")}
								</Typography>
								<Typography
									variant="h5"
									component="div"
									textAlign="center"
									sx={{ m: 4, px: 4 }}
									fontWeight="bold"
								>
									{t("contact.email")}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={4}>
						<Card>
							<CardContent
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
								}}
							>
								<HomeIcon sx={{ fontSize: 148 }} color="disabled" />
								<Typography
									sx={{ fontSize: 14 }}
									color="text.secondary"
									gutterBottom
								>
									{t("contact.sub_head")}
								</Typography>
								<Typography variant="h5" component="div" fontWeight="600">
									{t("contact.address_title")}
								</Typography>
								<Typography
									variant="h5"
									textAlign="center"
									component="div"
									sx={{ m: 4 }}
									fontWeight="bold"
								>
									{t("contact.address")}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={4}>
						<Card>
							<CardContent
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
								}}
							>
								<PhoneIcon sx={{ fontSize: 148 }} color="disabled" />
								<Typography
									sx={{ fontSize: 14 }}
									color="text.secondary"
									gutterBottom
								>
									{t("contact.sub_head")}
								</Typography>
								<Typography variant="h5" component="div" fontWeight="600">
									{t("contact.phone_title")}
								</Typography>
								<Typography
									variant="h5"
									component="div"
									sx={lang === "fa" ? { m: 4, direction: "rtl" } : {m: 4, direction: "ltr"}}
									textAlign="center"
									fontWeight="bold"
								>
									{t("contact.phone")}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
			<FooterOne />
		</>
	);
};
export default Contact;
