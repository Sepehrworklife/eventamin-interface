import { Container, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styles from "../../../styles/layout/features.module.scss";
import useTranslation from "next-translate/useTranslation";
import ContactPhoneTwoToneIcon from "@mui/icons-material/ContactPhoneTwoTone";
import BeenhereTwoToneIcon from "@mui/icons-material/BeenhereTwoTone";
import ContentPasteSearchTwoToneIcon from "@mui/icons-material/ContentPasteSearchTwoTone";

export const FeaturesSection = (props) => {
	const { t } = useTranslation("directory");
	return (
		<Box id={styles.features_container} sx={{ backgroundColor: props.bgColor }}>
			<Container maxWidth="lg">
				<Grid container columns={23}>
					<Grid item md={7} className={styles.item}>
						<Typography variant="h5" component="h5">
							<ContentPasteSearchTwoToneIcon
								color="primary"
								className={styles.icon}
							/>
							<span>{t("features.search.title")}</span>
						</Typography>
						<Typography variant="body1" component="p">
							{t("features.search.content")}
						</Typography>
					</Grid>
					<Divider orientation="vertical" flexItem />
					<Grid item md={7} className={styles.item}>
						<Typography variant="h5" component="h5">
							<BeenhereTwoToneIcon color="primary" className={styles.icon} />
							<span>{t("features.results.title")}</span>
						</Typography>
						<Typography variant="body1" component="p">
							{t("features.results.content")}
						</Typography>
					</Grid>
					<Divider orientation="vertical" flexItem />
					<Grid item md={7} className={styles.item}>
						<Typography variant="h5" component="h5">
							<ContactPhoneTwoToneIcon
								color="primary"
								className={styles.icon}
							/>
							<span>{t("features.get_in_touch.title")}</span>
						</Typography>
						<Typography variant="body1" component="p">
							{t("features.get_in_touch.content")}
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};
