import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import PageviewTwoToneIcon from "@mui/icons-material/PageviewTwoTone";
const Api = require("../../../constants/api.json");
import useDarkMode from "use-dark-mode";
import { CountryDetector } from "../../../utils/country";
import { grey } from "@mui/material/colors";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import CardSkeleton from "../../elements/skeleton/card";
import { RFPContext } from "../../../contexts/app-rfp-provider";
import NoImage from "../../../public/uploads/images/no-image.jpg";
import Link from "next/link";
import { useSearch as useSearchUsers } from "../../../hooks/user.hook";
import { isStringPersian } from "../../../utils/language";

const SearchResults = (props) => {
  // Hooks
  const { t, lang } = useTranslation("layouts");
  const { value: isDark } = useDarkMode();

  // Initial States
  const [textColor, setTextColor] = React.useState(null);
  const { rfp, setRfp } = React.useContext(RFPContext);

  const { results, error, loading } = useSearchUsers({
    category: props.basedBy === "category" ? props.query : null,
    company: props.basedBy === "company" ? props.query : null,
    company_fa:
      props.basedBy === "company" && isStringPersian(props.query)
        ? props.query
        : null,
    country: props.basedBy === "country" ? props.query : null,
  });

	// Handle rfp list when users click on the button
  function handleClick(event, data) {
    event.preventDefault();
    if (
      rfp.filter((value) => JSON.stringify(value) === JSON.stringify(data))
        .length > 0
    )
      return;
    setRfp((prev) => [...prev, data]);
  }

  React.useEffect(() => {
    isDark ? setTextColor(grey[400]) : setTextColor(grey[700]);
  }, [isDark]);

  return (
    <>
      {loading &&
        [1, 2, 3, 4].map((obj, index) => {
          return (
            <Box sx={{ width: 1 }} key={index}>
              <CardSkeleton marginBottom={2} />
            </Box>
          );
        })}
      {error && (
        <Typography variant="body" component="div">
          {t("common:no_record")}
        </Typography>
      )}
      <Grid container specing={4} rowSpacing={2}>
        {!error &&
          !loading &&
          results.map((obj, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Card sx={{ width: "100%" }}>
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <CardMedia
                        component="img"
                        image={obj.logo ? Api.url + obj.logo : NoImage.src}
                        alt={obj.username}
                      />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          component="h3"
                          fontWeight="600"
                        >
                          {lang === "fa"
                            ? obj.company_fa
                              ? obj.company_fa
                              : obj.company
                            : obj.company}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="p"
                          fontWeight="400"
                          color={textColor}
                          marginBottom={1}
                        >
                          {lang === "fa"
                            ? obj.short_description_fa
                              ? obj.short_description_fa
                              : obj.short_description
                            : obj.short_description}
                        </Typography>
                        <Typography
                          component="div"
                          variant="body2"
                          marginBottom={1}
                        >
                          <Chip label={obj.website} size="small" />
                          <Chip
                            label={CountryDetector(obj.country, lang)}
                            size="small"
                          />
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={6}>
                            <Button
                              size="small"
                              variant="outlined"
                              fullWidth
                              onClick={(e) =>
                                handleClick(e, {
                                  id: obj.id,
                                  company: obj.company,
                                  company_fa: obj.company_fa,
                                  logo: obj.logo,
                                })
                              }
                            >
                              <ShoppingCartCheckoutOutlinedIcon
                                fontSize="sm"
                                sx={{ mx: 1 }}
                              />
                              {t("common:add_to_request")}
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Link href={"/member/" + obj.id}>
                              <Button size="small" variant="outlined" fullWidth>
                                <AccountBoxOutlinedIcon
                                  fontSize="sm"
                                  sx={{ mx: 1 }}
                                />
                                {t("common:show_profile")}
                              </Button>
                            </Link>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default SearchResults;
