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
import CardIcon from "../../elements/card-icon/card-icon";
import Carousel from "react-material-ui-carousel";

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
            <Carousel
              autoplay={true}
              autoplaySpeed={5000}
              animation="fade"
              duration={1000}
              indicators={false}
              sx={{ height: 1 }}
            >
              <CardIcon
                title={t("buyers_vs_providers.time.title")}
                content={t("buyers_vs_providers.time.content")}
                icon={<HourglassBottomTwoToneIcon fontSize="42" />}
              />

              <CardIcon
                title={t("buyers_vs_providers.information.title")}
                content={t("buyers_vs_providers.information.content")}
                icon={<DiamondTwoToneIcon fontSize="42" />}
              />
              <CardIcon
                title={t("buyers_vs_providers.exclusive.title")}
                content={t("buyers_vs_providers.exclusive.content")}
                icon={<LockTwoToneIcon fontSize="42" />}
              />
            </Carousel>
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

            <Carousel
              autoplay={true}
              autoplaySpeed={5000}
              animation="fade"
              duration={700}
              indicators={false}
              sx={{ height: 1 }}
            >
              <CardIcon
                title={t("buyers_vs_providers.reach.title")}
                content={t("buyers_vs_providers.reach.content")}
                icon={<RecordVoiceOverTwoToneIcon fontSize="42" />}
              />

              <CardIcon
                title={t("buyers_vs_providers.transparent.title")}
                content={t("buyers_vs_providers.transparent.content")}
                icon={<MarkEmailReadTwoToneIcon fontSize="42" />}
              />
              <CardIcon
                title={t("buyers_vs_providers.premium.title")}
                content={t("buyers_vs_providers.premium.content")}
                icon={<WorkspacePremiumTwoToneIcon fontSize="42" />}
              />
            </Carousel>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <a href="https://saberansar.com/en/" target="_blank">
            <img
              src="/uploads/images/advertise/2.gif"
              className={styles.image}
            />
          </a>
        </Box>
      </Container>
    </Box>
  );
};
