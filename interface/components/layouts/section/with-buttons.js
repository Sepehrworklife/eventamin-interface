import {
	Button,
	Container,
	Divider,
	Grid,
	Link,
	Typography,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import useDarkMode from "use-dark-mode";
import styles from "../../../styles/home.module.scss";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

export const SectionWithButtons = (props) => {
	const { t, lang } = useTranslation("home");

	return (
		<Grid
			container
			id={styles.section_two}
			sx={{ backgroundColor: props.bgColor }}
		>
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
					align="center"
					marginBottom={4}
				>
					{props.description}
				</Typography>
				<Divider sx={{ mb: 2 }}  />
				<Box className={styles.flex_center}>
					<Link href={props.firstLink}>
						<Button variant="outlined" size="large" sx={{mx:1}}>
							{props.secondButtonText}
						</Button>
					</Link>
					<Link href={props.secondLink}>
						<Button variant="contained" size="large" sx={{mx:1}}>
							{props.firstButtonText}
						</Button>
					</Link>
				</Box>
			</Container>
		</Grid>
	);
};
