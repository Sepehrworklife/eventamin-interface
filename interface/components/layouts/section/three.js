import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import useDarkMode from "use-dark-mode";
import styles from "../../../styles/home.module.scss";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

export const SectionThree = (props) => {

	return (
		<Grid container id={styles.section_two} sx={{ backgroundColor: props.bgColor }}>
			<Container maxWidth="md">
				<Typography
					variant="h4"
					component="p"
					className={styles.title}
					marginBottom={2}
				>
					{props.title}
				</Typography>
				<Typography
					variant="body1"
					component="p"
					className={styles.description}
					sx={{mt: 4, whiteSpace: "pre-line"}}
				>
					{props.description}
				</Typography>
			</Container>
		</Grid>
	);
};
