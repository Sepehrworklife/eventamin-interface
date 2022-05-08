import React from "react";
import {
	ListItemIcon,
	Box,
	Grid,
	Card,
	Button,
	Container,
	Typography,
	CardContent,
	List,
	ListItem,
	Divider,
} from "@mui/material";
import styles from "../../../styles/layout/join-member.module.scss";
import useTranslation from "next-translate/useTranslation";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import Link from "next/link";

export const JoinMember = (props) => {
	const { t } = useTranslation("layouts");

	return (
		<Box id={styles.join_container} sx={{ backgroundColor: props.bgColor }}>
			<Container maxWidth="lg">
				<Typography
					variant="h4"
					component="div"
					align="center"
					fontWeight="700"
					marginBottom={4}
				>
					{t("join_member.title")}
				</Typography>
				<Grid container spacing={4} alignItems="center">
					<Grid xs={12} md={6} item>
						<Card className="item">
							<CardContent>
								<Typography
									variant="h5"
									component="h3"
									align="center"
									fontWeight="600"
								>
									{t("join_member.buyer.title")}
								</Typography>
								<Divider sx={{ my: 2 }} />
								<List>
									{t(
										"join_member.buyer.content",
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

								<Link href="/register">
								<Button variant="contained" fullWidth sx={{ mt: 2 }}>
									{t("join_member.register_button")}
								</Button>
							</Link>
							</CardContent>
						</Card>
					</Grid>
					<Grid xs={12} md={6} item>
						<Card>
							<CardContent>
								<Typography
									variant="h5"
									component="h3"
									align="center"
									fontWeight="600"
								>
									{t("join_member.provider.title")}
								</Typography>
								<Divider sx={{ my: 2 }} />
								<List>
									{t(
										"join_member.provider.content",
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

								<Link href="/register">
								<Button variant="contained" fullWidth sx={{ mt: 2 }}>
									{t("join_member.register_button")}
								</Button>
							</Link>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};
