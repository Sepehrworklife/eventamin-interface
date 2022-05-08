import {
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import styles from "../../../styles/layout/tools.module.scss";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";

export const Tools = (props) => {
	const { t } = useTranslation("directory");

	return (
		<Box id={styles.tools_container} sx={{ backgroundColor: props.bgColor }}>
			<Container maxWidth="lg">
				<Divider textAlign="center" className={styles.divider}>
					<Typography
						variant="h4"
						component="h5"
						align="center"
						className={styles.title}
					>
						{t("tools.title")}
					</Typography>
				</Divider>
				<Grid container spacing={4}>
					<Grid md={6} item container>
						<Grid md={5} item display={{xs: "none", md: "block"}}></Grid>
						<Grid xs={12} md={7} item>
							<Card className={styles.card}>
								<CardHeader title={t("tools.rfp_card.title")} />
								<CardContent>
									<List>
										{t(
											"tools.rfp_card.content",
											{},
											{ returnObjects: true }
										).map((text, index) => {
											return (
												<ListItem className={styles.list_item} key={index}>
													<ListItemIcon>
														<CheckBoxTwoToneIcon color="success" />
													</ListItemIcon>
													<Typography variant="body1" component="span">
														{text}
													</Typography>
												</ListItem>
											);
										})}
									</List>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
					<Grid md={6} item container>
						<Grid xs={12} md={7} item>
							<Card className={styles.card}>
								<CardHeader title={t("tools.favorites_list.title")} />
								<CardContent>
									<List>
										{t(
											"tools.favorites_list.content",
											{},
											{ returnObjects: true }
										).map((text, index) => {
											return (
												<ListItem className={styles.list_item} key={index}>
													<ListItemIcon>
														<CheckBoxTwoToneIcon color="success" />
													</ListItemIcon>
													<Typography variant="body1" component="span">
														{text}
													</Typography>
												</ListItem>
											);
										})}
									</List>
								</CardContent>
							</Card>
						</Grid>
						<Grid md={5} item display={{xs: "none", md: "block"}}></Grid>
					</Grid>
					<Grid md={6} item container></Grid>
				</Grid>
			</Container>
		</Box>
	);
};
