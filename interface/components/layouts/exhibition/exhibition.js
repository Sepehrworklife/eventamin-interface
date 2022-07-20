import { Container, Grid } from "@mui/material";
import { useFetchMultiExhibition } from "../../../hooks/use-exhibition";
import CardImage from "../../elements/card-image/card-image";
import ImageTextSkeleton from "../../elements/skeleton/image-text";
import { Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
const API = require("../../../constants/api.json");
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import styles from "./exhibition.module.scss";

const ExhibitionIntroduction = () => {
  const { t, lang } = useTranslation("home");
  const { data, loading, error } = useFetchMultiExhibition(3);

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography
        variant="h4"
        component="div"
        textAlign="center"
        fontWeight="700"
        marginBottom={4}
      >
        {t("exhibition.title")}
      </Typography>
      <Grid container spacing={3}>
        {loading &&
          [1, 2, 3].map((item, index) => (
            <Grid item sx={12} md={4} key={index}>
              <ImageTextSkeleton />
            </Grid>
          ))}
        {!loading &&
          !error &&
          data.map((item, index) => {
            return (
              <Grid item xs={12} md={4} key={index} sx={{ height: "100%" }}>
                <CardImage
                  imageSrc={API.url + item.thumbnail}
                  title={lang === "fa" ? item.title_fa : item.title}
                  sx={{ height: 1 }}
                  link={item.link}
                  buttonText={t("home:section_two.find_out_button")}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className={`${styles.flex} ${styles.align_items_center}`}
                    marginBottom={1}
                  >
                    <LocationOnIcon />
                    {lang === "fa" ? item.location_fa : item.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className={`${styles.flex} ${styles.align_items_center}`}
                  >
                    <DateRangeIcon />
                    {lang === "fa" ? item.date_fa : item.date}
                  </Typography>
                </CardImage>
              </Grid>
            );
          })}
        {error && (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mt: 3, textAlign: "center" }}
            component="p"
          >
            {t("common:no_record")}
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ExhibitionIntroduction;
