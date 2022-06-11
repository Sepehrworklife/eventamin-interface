import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import useDarkMode from "use-dark-mode";
import styles from "../../../styles/home.module.scss";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import {useRouter} from 'next/router';

export const SectionTwo = () => {
	const { t, lang } = useTranslation("home");
	const router = useRouter();
	const { value: isDark } = useDarkMode();
	const [bgColor, setBgColor] = React.useState(null);

	React.useEffect(() => {
		isDark ? setBgColor(grey[900]) : setBgColor(grey[200]);
	});

	return (
		<Grid container id={styles.section_two} sx={{ backgroundColor: bgColor }}>
			<Container maxWidth="md">
				<Typography
					variant="h4"
					component="p"
					className={styles.title}
					textAlign="center"
					marginBottom={2}
				>
					{t("section_two.title")}
				</Typography>
				<Typography
					variant="body1"
					component="p"
					className={styles.description}
					marginBottom={4}
				>
					{t("section_two.description")}
				</Typography>
				<Divider sx={{ mb: 2 }} textAlign="center">
					<Button variant="contained" size="large" onClick={() => router.push('/about')}>
						{t("section_two.find_out_button")}
					</Button>
				</Divider>
			</Container>
		</Grid>
	);
};
