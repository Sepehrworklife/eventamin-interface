import {Hidden, Box, Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "../../../styles/layout/grow.module.scss";
import ScreenSearchDesktopTwoToneIcon from "@mui/icons-material/ScreenSearchDesktopTwoTone";
import useTranslation from "next-translate/useTranslation";
import useDarkMode from "use-dark-mode";
import { grey } from "@mui/material/colors";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import ArrowLeftTwoToneIcon from "@mui/icons-material/ArrowLeftTwoTone";
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import NextWeekTwoToneIcon from '@mui/icons-material/NextWeekTwoTone';
import TimelapseTwoToneIcon from '@mui/icons-material/TimelapseTwoTone';

export const Grow = (props) => {
	const { t, lang } = useTranslation("layouts");
	const { value: isDark } = useDarkMode();

	// States
	const [textColor, setTextColor] = React.useState(null);

	React.useEffect(() => {
		isDark ? setTextColor(grey[400]) : setTextColor(grey[700]);
	});

	return (
		<Box id={styles.grow_container} sx={{ backgroundColor: props.bgColor }}>
			<Container maxWidth="lg">
					<Typography
						variant="h4"
						component="h5"
						align="center"
						className={styles.title}
					>
						{t("grow.title")}
					</Typography>
				<Grid container className={styles.grow_flex}>
					<Grid className={styles.item}>
						<Typography align="center" variant="h2" component="div">
							<ScreenSearchDesktopTwoToneIcon fontSize="lg" color="secondary" />
						</Typography>
						<Typography align="center" variant="h6" component="h5">
							{t("grow.directory.title")}
						</Typography>
						<Typography
							align="center"
							variant="body1"
							component="p"
							sx={{ color: textColor }}
						>
							{t("grow.directory.content")}
						</Typography>
					</Grid>
					<Divider orientation="vertical" flexItem align="center">
						{lang === 'fa' ? <ArrowLeftTwoToneIcon color="disabled"/> : <ArrowRightTwoToneIcon color="disabled"/>}
					</Divider>
					<Grid className={styles.item}>
						<Typography align="center" variant="h2" component="div">
							<AssignmentIndTwoToneIcon fontSize="lg" color="secondary" />
						</Typography>
						<Typography align="center" variant="h6" component="h5">
							{t("grow.profile.title")}
						</Typography>
						<Typography
							align="center"
							variant="body1"
							component="p"
							sx={{ color: textColor }}
						>
							{t("grow.profile.content")}
						</Typography>
					</Grid>
					<Hidden smDown>
					<Divider orientation="vertical" flexItem align="center">
						{lang === 'fa' ? <ArrowLeftTwoToneIcon color="disabled"/> : <ArrowRightTwoToneIcon color="disabled"/>}
					</Divider>
					</Hidden>
					<Grid className={styles.break}></Grid>
					<Grid className={styles.item}>
						<Typography align="center" variant="h2" component="div">
							<PublicTwoToneIcon fontSize="lg" color="primary" />
						</Typography>
						<Typography align="center" variant="h6" component="h5">
							{t("grow.eventamin.title")}
						</Typography>
						<Typography
							align="center"
							variant="body1"
							component="p"
							sx={{ color: textColor }}
						>
							{t("grow.eventamin.content")}
						</Typography>
					</Grid>
					<Divider orientation="vertical" flexItem align="center">
						{lang === 'fa' ? <ArrowLeftTwoToneIcon color="disabled"/> : <ArrowRightTwoToneIcon color="disabled"/>}
					</Divider>
					<Grid className={styles.item}>
						<Typography align="center" variant="h2" component="div">
							<NextWeekTwoToneIcon fontSize="lg" color="secondary" />
						</Typography>
						<Typography align="center" variant="h6" component="h5">
							{t("grow.search.title")}
						</Typography>
						<Typography
							align="center"
							variant="body1"
							component="p"
							sx={{ color: textColor }}
						>
							{t("grow.search.content")}
						</Typography>
					</Grid>
					<Hidden smDown>
					<Divider orientation="vertical" flexItem align="center">
						{lang === 'fa' ? <ArrowLeftTwoToneIcon color="disabled"/> : <ArrowRightTwoToneIcon color="disabled"/>}
					</Divider>
				</Hidden>
					<Grid className={styles.break}></Grid>
					<Grid className={styles.item}>
						<Typography align="center" variant="h2" component="div">
							<TimelapseTwoToneIcon fontSize="lg" color="secondary" />
						</Typography>
						<Typography align="center" variant="h6" component="h5">
							{t("grow.rfp.title")}
						</Typography>
						<Typography
							align="center"
							variant="body1"
							component="p"
							sx={{ color: textColor }}
						>
							{t("grow.rfp.content")}
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};
