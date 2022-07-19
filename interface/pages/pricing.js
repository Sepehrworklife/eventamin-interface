import MainNavbar from "../components/layouts/navbar/main";
import { CtaRegister } from "../components/layouts/section/cta-register";
import { FooterOne } from "../components/layouts/footer/one";
import Head from "next/head";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import DoneIcon from "@mui/icons-material/Done";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";

const Pricing = () => {
  const { t, lang } = useTranslation("");
  return (
    <>
      <Head>
        <title>{t("head:home.title")}</title>
        <meta name="description" content={t("head:home.description")} />
        <meta name="keywords" content={t("head:home.keywords")} />
      </Head>
      <MainNavbar />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography
          variant="h4"
          components="h2"
          fontWeight="600"
          textAlign="center"
        >
          Unlock your full potential of EVINTRA with Premium Membership
        </Typography>
      </Container>
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: 1 }}>
              <LinearProgress
                color="inherit"
                sx={{ height: "8px;" }}
                variant="determinate"
                value={100}
              />
              <CardHeader
                title="Free"
                subheader="Two Destination"
                sx={{ textAlign: "center" }}
              />
              <CardContent>
                <Typography
                  variant="body"
                  color="text.secondary"
                  textAlign="center"
                  component="p"
                >
                  It's free
                </Typography>
                <Typography variant="h4" fontWeight="600" textAlign="center">
                  For ever!
                </Typography>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ my: 3 }}
                  fullWidth
                >
                  Start Free
                </Button>
                <Typography variant="body1" color="text.secondary">
                  Free plan includes:
                </Typography>
                <MenuList>
                  <MenuItem>
                    <ListItemIcon>
                      <DoneIcon fontSize="12" />
                    </ListItemIcon>
                    <Typography variant="body2">
                      Random order listing for 1 city
                    </Typography>
                  </MenuItem>
                </MenuList>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: 1 }}>
              <LinearProgress
                color="secondary"
                sx={{ height: "8px;" }}
                variant="determinate"
                value={100}
              />
              <CardHeader
                title="Basic"
                subheader="Extra city listing"
                sx={{ textAlign: "center" }}
              />
              <CardContent>
                <Typography
                  variant="body"
                  color="text.secondary"
                  textAlign="center"
                  component="p"
                >
                  Only
                </Typography>
                <Typography variant="h4" fontWeight="600" textAlign="center">
                  10$/Year
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ my: 3 }}
                  fullWidth
                >
                  Get Started
                </Button>
                <Typography variant="body1" color="text.secondary">
                  Free plan includes:
                </Typography>
                <MenuList>
                  <MenuItem>
                    <ListItemIcon>
                      <DoneIcon fontSize="12" />
                    </ListItemIcon>
                    <Typography variant="body2" noWrap>
                      Listing on the top of the first page results for city
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <DoneIcon fontSize="12" />
                    </ListItemIcon>
                    <Typography variant="body2" noWrap>
                      Highlighted listing with BASIC batch
                    </Typography>
                  </MenuItem>
                </MenuList>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: 1,
              }}
            >
              <LinearProgress
                color="primary"
                sx={{ height: "8px;" }}
                variant="determinate"
                value={100}
              />
              <CardHeader
                title="Pro"
                subheader="Premium for entire country"
                sx={{ textAlign: "center" }}
              />
              <CardContent>
                <Typography
                  variant="body"
                  color="text.secondary"
                  textAlign="center"
                  component="p"
                >
                  Only
                </Typography>
                <Typography variant="h4" fontWeight="600" textAlign="center">
                  39$/Year
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ my: 3 }}
                  fullWidth
                >
                  Get Started
                </Button>
                <Typography variant="body1" color="text.secondary">
                  Free plan includes:
                </Typography>
                <MenuList>
                  <MenuItem>
                    <ListItemIcon>
                      <DoneIcon fontSize="12" />
                    </ListItemIcon>
                    <Typography variant="body2" noWrap>
                      Bigger highlighted listing with PRO batch
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <DoneIcon fontSize="12" />
                    </ListItemIcon>
                    <Typography variant="body2" noWrap>
                      Listing on the top of the first page results
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <DoneIcon fontSize="12" />
                    </ListItemIcon>
                    <Typography variant="body2" noWrap>
                      Listed for all search requests for entire countries
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <DoneIcon fontSize="12" />
                    </ListItemIcon>
                    <Typography variant="body2" noWrap>
                      Listed for all search requests for entire countries
                    </Typography>
                  </MenuItem>
                </MenuList>
              </CardContent>
              <LinearProgress
                color="primary"
                sx={{ height: "8px;" }}
                value={100}
                variant="determinate"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <CtaRegister />
      <FooterOne />
    </>
  );
};

export default Pricing;
