import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styles from "../../../styles/layout/cta-register.module.scss";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export const CtaRegister = (props) => {
	const { t } = useTranslation("layouts");
	const router = useRouter();

	return (
		<Box id={styles.cta_register_container}>
			<Box className={styles.container_content}>
				<Typography align="center" variant="h4" component="p">
					{t("cta_register.title")}
				</Typography>
				<Box className={styles.buttons}>
					<Button variant="contained" onClick={() => router.push("/login")}>
						{t("cta_register.login")}
					</Button>
					<Button variant="contained" onClick={() => router.push("/register")}>
						{t("cta_register.register")}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
