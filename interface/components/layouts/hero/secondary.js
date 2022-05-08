import { Container, Grid, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import styles from "../../../styles/home.module.scss";
import { Search } from "../../modules/home/search";

export const SecondaryHero = (props) => {
	const { t, lang } = useTranslation("home");

	return (
		<Grid container id={styles.main_hero}>
			<Container maxWidth="md" id={styles.main_hero_container}>
				<Typography variant="h5" component="p">
					{props.subHead}
				</Typography>
				<Typography variant="h4" component="h2" sx={{mt:4}}>
					{props.head}
				</Typography>
			</Container>
		</Grid>
	);
};
