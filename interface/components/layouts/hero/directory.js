import { Container, Grid, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import styles from "../../../styles/directory.module.scss";
import { Search } from "../../modules/home/search";

export const DirectoryHero = (props) => {
	const { t, lang } = useTranslation("home");

	return (
		<Grid container id={styles.directory_hero}>
			<Container maxWidth="md" id={styles.main_hero_container}>
				<Search />
				<Typography variant="h4" component="h2" sx={{mt:4}}>
					{props.head}
				</Typography>
				<Typography variant="h5" component="p">
					{props.subHead}
				</Typography>
			</Container>
		</Grid>
	);
};
