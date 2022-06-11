import { Box } from "@mui/system";
import React from "react";
import HdrStrongIcon from "@mui/icons-material/HdrStrong";
import useDarkMode from "use-dark-mode";
import styles from "../../../styles/home.module.scss";
import { grey, blueGrey, blue } from "@mui/material/colors";
import {
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export const FooterOne = () => {
	const { t, lang } = useTranslation("home");
	const { value: isDark } = useDarkMode();
	const [bgColor, setBgColor] = React.useState(null);
	const [secondBgColor, setSecondBgColor] = React.useState(null);

	React.useEffect(() => {
		isDark ? setBgColor(grey[1000]) : setBgColor(blue[600]);
	}, [isDark]);
	return (
		<Box id={styles.footer} sx={{backgroundColor: bgColor, boxShadow: "6px -2px 4px -1px rgb(0 0 0 / 20%), 0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)"}}>
			<Container maxWidth="lg">
				<Grid container>
					<Grid item xs={12} md={4}>
						<Typography component="h4" variant="h5" fontWeight="700" color="white">
							{t("footer.section_one.title")}
						</Typography>
						<List dense={false}>
							<ListItem>
								<ListItemIcon>
									<HdrStrongIcon />
								</ListItemIcon>
								<ListItemText
									primary={
										<Link href="/search/country/ir">
											{t("footer.section_one.iran")}
										</Link>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<HdrStrongIcon />
								</ListItemIcon>
								<ListItemText
									primary={
										<Link href="/search/country/tr">
											{t("footer.section_one.turkey")}
										</Link>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<HdrStrongIcon />
								</ListItemIcon>
								<ListItemText
									primary={
										<Link href="/search/country/az">
											{t("footer.section_one.azerbaijan")}
										</Link>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<HdrStrongIcon />
								</ListItemIcon>
								<ListItemText
									primary={
										<Link href="/search/country/cn">
											{t("footer.section_one.china")}
										</Link>
									}
								/>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography component="h4" variant="h5" fontWeight="700" color="white">
							{t("footer.section_two.title")}
						</Typography>
						<List dense={false}>
							<ListItem>
								<ListItemIcon>
									<HdrStrongIcon />
								</ListItemIcon>
								<ListItemText
									primary={
								<Link href="/">
											{t("footer.section_two.home")}
										</Link>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<HdrStrongIcon />
								</ListItemIcon>
								<ListItemText
									primary={
								<Link href="/about">
											{t("footer.section_two.about")}
										</Link>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<HdrStrongIcon />
								</ListItemIcon>
								<ListItemText
									primary={
								<Link href="/contact">
											{t("footer.section_two.contact")}
										</Link>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<HdrStrongIcon />
								</ListItemIcon>
								<ListItemText
									primary={
								<Link href="/news">
											{t("footer.section_two.news")}
										</Link>
									}
								/>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography component="h4" variant="h5" fontWeight="700" color="white">
							{t("footer.section_three.title")}
						</Typography>
						<List dense={false}>
							<ListItem>
								<ListItemIcon>
									<HdrStrongIcon />
								</ListItemIcon>
								<ListItemText
									primary={
										<a href="https://instagram.com/eventamin.cam?r=nametag" target="_blank">
											{t("footer.section_three.instagram")}
										</a>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<HdrStrongIcon />
								</ListItemIcon>
								<ListItemText
									primary={
										<Link href="#">
											{t("footer.section_three.linkedin")}
										</Link>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<HdrStrongIcon />
								</ListItemIcon>
								<ListItemText
									primary={
										<Link href="#">
											{t("footer.section_three.twitter")}
										</Link>
									}
								/>
							</ListItem>
							
						</List>
					</Grid>
				</Grid>
				<Divider sx={{ my: 5 }} />
			</Container>
			<Typography variant="body1" component="p" textAlign="center" color="white">
				{lang === "fa"
					? "تمامی حقوق متعلق به ایونتامین است"
					: "Copyright Reserved | Eventamin"}
			</Typography>
		</Box>
	);
};
