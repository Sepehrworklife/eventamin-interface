import {
	Paper,
	IconButton,
	InputBase,
	Divider,
	Autocomplete,
	Box,
	TextField,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { countries } from "../../../constants/countries";
import useTranslation from "next-translate/useTranslation";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import { useRouter } from "next/router";

export const Search = (props) => {
	const { t, lang } = useTranslation();
	const [basedBy, setBasedBy] = React.useState(false);
	const router = useRouter();

	function handleClick() {
		setBasedBy(!basedBy);
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
		<>
			<Paper
				component="div"
				sx={{
					p: "2px 4px",
					display: "flex",
					alignItems: "center",
					width: "100%",
					my: 3,
				}}
			>
				<IconButton sx={{ p: "10px" }} aria-label="menu" onClick={handleClick}>
					{!basedBy ? <LanguageOutlinedIcon /> : <BusinessIcon />}
				</IconButton>

				{!basedBy ? (
					<Autocomplete
						id="field_country"
						name="country"
						options={countries}
						autoHighlight
						sx={{ width: 1 }}
						onChange={(e, value) => {
							router.push("/search/country/" + value?.code.toLowerCase());
						}}
						getOptionLabel={(option) => option.label}
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
									src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
									srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
									alt=""
								/>
								{option.label} ({option.code}) +{option.phone}
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
				) : (
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
					disabled={!basedBy ? true : false}
					onClick={handleSubmit}
				>
					<SearchIcon />
				</IconButton>
			</Paper>
		</>
	);
};
