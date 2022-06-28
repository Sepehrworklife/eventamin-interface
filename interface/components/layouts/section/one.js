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
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					<Grid item md={9} order={{xs:2}}>
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
					<Grid item md={3} order={{xs: 1, md: 2 }} className={styles.flex_center}>
						{lang === "fa" ? (
						<a href="https://www.gostaresh.news/%D8%A8%D8%AE%D8%B4-%D9%86%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87-20" target="_blank">
						<img src="/uploads/images/advertise/1.gif" className={styles.image} />
					</a>
						) : (
						<a href="https://www.exhibitionworld.co.uk/" target="_blank">
						<img src="/uploads/images/advertise/0.gif" className={styles.image} />
					</a>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grid>
	);
};
