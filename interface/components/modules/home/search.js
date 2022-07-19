import Link from "next/link";
import {
  Paper,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  InputBase,
  Divider,
  Autocomplete,
  Box,
  ButtonGroup,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { countries } from "../../../constants/countries";
import useTranslation from "next-translate/useTranslation";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useRouter } from "next/router";
import styles from "../../../styles/home.module.scss";
import { services } from "../../../constants/service-categories";

export const Search = (props) => {
  const { t, lang } = useTranslation();
  const [state, setState] = React.useState("country");
  const router = useRouter();

  function handleClick(e, newValue) {
    setState(newValue);
  }

  function handleSubmit() {
    const company = document.getElementById("company_text_search").value;
    if (company.length < 3) {
      alert("Search for at least 3 charachters");
      return;
    }
    router.push("/search/company/" + company);
  }

  return (
    <Box
      sx={{
        my: 3,
        bgcolor: "rgba(0,0,0,.6)",
        borderRadius: ".5rem",
        padding: "1rem",
      }}
    >
      <ButtonGroup
        variant="contained"
        aria-label="outlined button group"
        size="large"
        sx={{ display: "flex", justifyContent: "center", boxShadow: 0 }}
      >
        <Button
          color={state === "company" ? "secondary" : "info"}
          onClick={(e) => handleClick(e, "company")}
        >
          {t("common:company")}
        </Button>
        <Button
          color={state === "country" ? "secondary" : "info"}
          onClick={(e) => handleClick(e, "country")}
        >
          {t("common:country")}
        </Button>
        <Button
          color={state === "category" ? "secondary" : "info"}
          onClick={(e) => handleClick(e, "category")}
        >
          {t("common:category")}
        </Button>
      </ButtonGroup>
      {(state === "company" || state === "country") && (
        <Paper
          component="div"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: 2,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            {state === "country" ? (
              <LanguageOutlinedIcon />
            ) : state === "company" ? (
              <BusinessIcon />
            ) : null}
          </IconButton>

          {state === "country" && (
            <Autocomplete
              id="field_country"
              name="country"
              options={countries}
              autoHighlight
              sx={{ width: 1 }}
              onChange={(e, value) => {
                router.push("/search/country/" + value?.code.toLowerCase());
              }}
              getOptionLabel={(option) =>
                lang === "fa" ? option.persian : option.label
              }
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
                    src={`https://flagcdn.com/w19/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {lang === "fa" ? option.persian : option.label} |{" "}
                  {`+${option.phone}`}
                </Box>
              )}
              renderInput={(params) => {
                const { InputLabelProps, InputProps, ...rest } = params;
                return (
                  <InputBase
                    {...params.InputProps}
                    {...rest}
                    placeholder={t("common:search_country_text")}
                  />
                );
              }}
            />
          )}
          {state === "company" && (
            <InputBase
              sx={{ mx: 1, flex: 1 }}
              placeholder={t("common:search_company_text")}
              required
              id="company_text_search"
            />
          )}
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            disabled={state === "country"}
            onClick={handleSubmit}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      )}
      {state === "category" && (
        <Box className={styles.header_search_chip_box}>
          <FormControl
            fullWidth
            sx={{ bgcolor: "white", borderRadius: "0.3rem" }}
          >
            <Select displayEmpty value="choose">
							<MenuItem disabled value="choose">
                {t("common:category")}
              </MenuItem>
              {services.map((category, index) => (
                <Link
                  href={`/search/category/${category.code}`}
                  key={category.code}
                  passHref={true}
                >
                  <MenuItem>
                    {lang === "fa" ? category.fa : category.en}
                  </MenuItem>
                </Link>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};
