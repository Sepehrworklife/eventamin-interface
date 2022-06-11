import { Button, Container, Grid, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import styles from "../../../styles/home.module.scss";
import MockUpImage from '../../../public/uploads/images/mock-img.png';
import {Box} from "@mui/system";
import {useRouter} from 'next/router';

export const SectionOne = () => {
	const { t, lang } = useTranslation("home");
	const router = useRouter();

	return (
		<Grid id={styles.section_one}>
			<Container maxWidth="md">
				<Grid container spacing={4}>
					<Grid item md={6} order={{xs:2}}>
						<Typography
							variant="h5"
							component="p"
							className={styles.title}
							marginBottom={2}
						>
							{t("section_one.title")}
						</Typography>
						<Typography
							variant="body1"
							component="p"
							className={styles.description}
							marginBottom={4}
						>
							{t("section_one.description")}
						</Typography>
						<Button variant="contained" size="large" onClick={() => router.push('/register')}>
							{t("section_one.join_button")}
						</Button>
						<Button variant="outlined" size="large" sx={{ mx: 1 }} onClick={() => router.push('/contact')}>
							{t("section_one.contact_button")}
						</Button>
					</Grid>
					<Grid item md={6} order={{xs: 1, md: 2 }} className={styles.flex_center}>
						<img src={MockUpImage.src} className={styles.image} style={{maxWidth: "400px"}}/>
					</Grid>
				</Grid>
			</Container>
		</Grid>
	);
};
