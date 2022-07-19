import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardHeader, Container, Divider, Grid } from "@mui/material";
import Head from "next/head";
import { FooterOne } from "../components/layouts/footer/one";
import MainNavbar from "../components/layouts/navbar/main";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import useTranslation from "next-translate/useTranslation";
import ContactForm from "../components/modules/contact/contact.form";

const Contact = () => {
  const { t, lang } = useTranslation("about");
  return (
    <>
      <Head>
        <title>{t("head:contact.title")}</title>
        <meta name="description" content={t("head:contact.description")} />
        <meta name="keywords" content={t("head:contact.keywords")} />
      </Head>
      <MainNavbar />
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader
                title={t("contact.title")}
                subheader={t("contact.sub_head")}
              />
              <Divider sx={{ mb: 4 }} />
              <CardContent>
                <ContactForm t={t} />
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            container
            spacing={4}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <Grid item xs={12}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <MailOutlineIcon sx={{ fontSize: 48 }} color="primary" />
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
            <Grid item xs={12}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 48 }} color="primary" />
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
                    sx={
                      lang === "fa"
                        ? { m: 4, direction: "rtl" }
                        : { m: 4, direction: "ltr" }
                    }
                    textAlign="center"
                    fontWeight="bold"
                  >
                    {t("contact.phone")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <HomeIcon sx={{ fontSize: 48 }} color="primary" />
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
          </Grid>
        </Grid>
      </Container>
      <FooterOne />
    </>
  );
};
export default Contact;
