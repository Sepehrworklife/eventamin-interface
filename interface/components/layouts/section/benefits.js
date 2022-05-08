import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import React from "react";
import styles from "../../../styles/layout/benefits.module.scss";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import useDarkMode from "use-dark-mode";
import { grey } from "@mui/material/colors";
import useTranslation from "next-translate/useTranslation";
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import ChangeCircleTwoToneIcon from '@mui/icons-material/ChangeCircleTwoTone';

export const Benefits = (props) => {
	const { t } = useTranslation("layouts");
	const { value: isDark } = useDarkMode();

	// States
	const [textColor, setTextColor] = React.useState(null);

	React.useEffect(() => {
		isDark ? setTextColor(grey[400]) : setTextColor(grey[700]);
	});
	return (
		<Box id={styles.benefits_container}>
			<Container maxWidth="lg">
				<Divider textAlign="center" className={styles.divider}>
					<Typography
						variant="h4"
						component="h5"
						align="center"
						className={styles.title}
					>
						{t("benefits.title")}
					</Typography>
				</Divider>
				<Grid container spacing={4}>
					<Grid item md={4} className={styles.item}>
						<Typography align="center" variant="h2" component="div">
							<MapTwoToneIcon fontSize="lg" color="primary" />
						</Typography>
						<Typography align="center" variant="h5" component="h5">
							{t("benefits.find.title")}
						</Typography>
						<Typography
							align="center"
							variant="body1"
							component="p"
							sx={{ color: textColor }}
						>
							{t("benefits.find.content")}
						</Typography>
					</Grid>
					<Grid item md={4} className={styles.item}>
						<Typography align="center" variant="h2" component="div">
							<PersonSearchTwoToneIcon fontSize="lg" color="primary" />
						</Typography>
						<Typography align="center" variant="h5" component="h5">
							{t("benefits.be_found.title")}
						</Typography>
						<Typography
							align="center"
							variant="body1"
							component="p"
							sx={{ color: textColor }}
						>
							{t("benefits.be_found.content")}
						</Typography>
					</Grid>
					<Grid item md={4} className={styles.item}>
						<Typography align="center" variant="h2" component="div">
							<ChangeCircleTwoToneIcon fontSize="lg" color="primary" />
						</Typography>
						<Typography align="center" variant="h5" component="h5">
							{t("benefits.roi.title")}
						</Typography>
						<Typography
							align="center"
							variant="body1"
							component="p"
							sx={{ color: textColor }}
						>
							{t("benefits.roi.content")}
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};
