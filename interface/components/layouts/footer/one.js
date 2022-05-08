import { Box } from "@mui/system";
import React from "react";
import useDarkMode from "use-dark-mode";
import styles from "../../../styles/home.module.scss";
import { grey, blueGrey, blue } from "@mui/material/colors";
import {Typography} from "@mui/material";
import useTranslation from 'next-translate/useTranslation';

export const FooterOne = () => {
	const {lang} = useTranslation();
	const { value: isDark } = useDarkMode();
	const [bgColor, setBgColor] = React.useState(null);

	React.useEffect(() => {
		isDark ? setBgColor("#121212") : setBgColor(blue[500]);
	});
	return (
		<Box id={styles.footer}>
			<Typography variant="body2" component="p" textAlign="center">
				{lang === "fa" ? "تمامی حقوق متعلق به اوینتامین است" : "Copyright Reserved | Eventamin"}
			</Typography>
		</Box>
	);
};
