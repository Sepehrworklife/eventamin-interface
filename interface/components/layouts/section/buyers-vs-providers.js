import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styles from "../../../styles/layout/buyers-vs-providers.module.scss";
import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";
import DiamondTwoToneIcon from "@mui/icons-material/DiamondTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import useTranslation from "next-translate/useTranslation";
import useDarkMode from "use-dark-mode";
import { grey } from "@mui/material/colors";
import RecordVoiceOverTwoToneIcon from "@mui/icons-material/RecordVoiceOverTwoTone";
import MarkEmailReadTwoToneIcon from "@mui/icons-material/MarkEmailReadTwoTone";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";

export const BuyersVsProviders = (props) => {
  const { value: isDark } = useDarkMode();
  const { t, lang } = useTranslation("layouts");

  // States
  const [textColor, setTextColor] = React.useState(null);

  React.useEffect(() => {
    isDark ? setTextColor(grey[400]) : setTextColor(grey[700]);
  });
  return (
    <Box
      id={styles.diffrence_container}
      sx={{ backgroundColor: props.bgColor }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} rowSpacing={5}>
          <Grid xs={12} md={6} item>
            <Typography
              variant="h4"
              component="h2"
              align="center"
              className={styles.title}
            >
              {t("common:buyer")}
            </Typography>
            <Card className={styles.item}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography
                      variant="h2"
                      component="div"
                      align="center"
                      className={styles.icon}
                    >
                      <HourglassBottomTwoToneIcon fontSize="" />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography
                      variant="h5"
                      component="h5"
                      fontWeight="600"
                      marginBottom={1}
                    >
                      {t("buyers_vs_providers.time.title")}
                    </Typography>
                    <Typography
                      color={textColor}
                      variant="body1"
                      component="p"
                      fontWeight="200"
                    >
                      {t("buyers_vs_providers.time.content")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={styles.item}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography
                      variant="h2"
                      component="div"
                      align="center"
                      className={styles.icon}
                    >
                      <DiamondTwoToneIcon fontSize="" />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography
                      variant="h5"
                      component="h5"
                      fontWeight="600"
                      marginBottom={1}
                    >
                      {t("buyers_vs_providers.information.title")}
                    </Typography>
                    <Typography
                      color={textColor}
                      variant="body1"
                      component="p"
                      fontWeight="200"
                    >
                      {t("buyers_vs_providers.information.content")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={styles.item}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography
                      variant="h2"
                      component="div"
                      align="center"
                      className={styles.icon}
                    >
                      <LockTwoToneIcon fontSize="" />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography
                      variant="h5"
                      component="h5"
                      fontWeight="600"
                      marginBottom={1}
                    >
                      {t("buyers_vs_providers.exclusive.title")}
                    </Typography>
                    <Typography
                      color={textColor}
                      variant="body1"
                      component="p"
                      fontWeight="200"
                    >
                      {t("buyers_vs_providers.exclusive.content")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={6} item>
            <Typography
              variant="h4"
              component="h2"
              align="center"
              className={styles.title}
            >
              {t("common:provider")}
            </Typography>
            <Card className={styles.item}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography
                      variant="h2"
                      component="div"
                      align="center"
                      className={styles.icon}
                    >
                      <RecordVoiceOverTwoToneIcon fontSize="" />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography
                      variant="h5"
                      component="h5"
                      fontWeight="600"
                      marginBottom={1}
                    >
                      {t("buyers_vs_providers.reach.title")}
                    </Typography>
                    <Typography
                      color={textColor}
                      variant="body1"
                      component="p"
                      fontWeight="200"
                    >
                      {t("buyers_vs_providers.reach.content")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={styles.item}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography
                      variant="h2"
                      component="div"
                      align="center"
                      className={styles.icon}
                    >
                      <MarkEmailReadTwoToneIcon fontSize="" />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography
                      variant="h5"
                      component="h5"
                      fontWeight="600"
                      marginBottom={1}
                    >
                      {t("buyers_vs_providers.transparent.title")}
                    </Typography>
                    <Typography
                      color={textColor}
                      variant="body1"
                      component="p"
                      fontWeight="200"
                    >
                      {t("buyers_vs_providers.transparent.content")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={styles.item}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography
                      variant="h2"
                      component="div"
                      align="center"
                      className={styles.icon}
                    >
                      <WorkspacePremiumTwoToneIcon fontSize="" />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography
                      variant="h5"
                      component="h5"
                      fontWeight="600"
                      marginBottom={1}
                    >
                      {t("buyers_vs_providers.premium.title")}
                    </Typography>
                    <Typography
                      color={textColor}
                      variant="body1"
                      component="p"
                      fontWeight="200"
                    >
                      {t("buyers_vs_providers.premium.content")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
				<Box sx={{display: "flex", justifyContent: "center", mt: 8}}>
        <a href="https://saberansar.com/en/" target="_blank">
          <img src="/uploads/images/advertise/2.gif" className={styles.image} />
        </a>
			</Box>
      </Container>
    </Box>
  );
};
