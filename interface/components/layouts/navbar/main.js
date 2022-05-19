import * as React from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useDarkMode from "use-dark-mode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useRouter } from "next/router";
import Authenticate from "../../../utils/authenticate";
import useTranslation from "next-translate/useTranslation";
const Api = require("../../../constants/api.json");
import setLanguage from 'next-translate/setLanguage'

const MainNavbar = () => {
	const auth = new Authenticate();
	const router = useRouter();
	const { t, lang } = useTranslation();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const darkMode = useDarkMode();
	const [user, setUser] = React.useState(null);
	const [isDark, setIsDark] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleSwitchLanguage = async() => {
		if (lang === "en") await setLanguage('fa')
		else await setLanguage('en')
	};
	const actionLogout = (e) => {
		setAnchorElNav(null);
		auth.removeToken();
		router.push("/login");
	};

	const handleCloseUserMenu = (e) => {
		setAnchorElUser(null);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const darkModeHandler = () => {
		setIsDark(!isDark);
		darkMode.toggle();
	};

	React.useEffect(() => {
		setUser(auth.getUserData());
		setIsDark(window.localStorage.getItem("darkMode"));
	}, []);
	return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex", md: "none" },
							}}
						>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								sx={{
									display: { xs: "block", md: "none" },
								}}
								onClose={handleCloseNavMenu}
							>
								<MenuItem onClick={() => router.push("/")}>
									<Typography textAlign="center">
										{t("common:appbar.home")}
									</Typography>
								</MenuItem>
								<MenuItem onClick={() => router.push("/about")}>
									<Typography textAlign="center">
										{t("common:appbar.about")}
									</Typography>
								</MenuItem>
								<MenuItem onClick={() => router.push("/directory")}>
									<Typography textAlign="center">
										{t("common:appbar.directory")}
									</Typography>
								</MenuItem>
								<MenuItem onClick={() => router.push("/products")}>
									<Typography textAlign="center">
										{t("common:appbar.products")}
									</Typography>
								</MenuItem>

								<MenuItem onClick={() => router.push("/news")}>
									<Typography textAlign="center">
										{t("common:appbar.news")}
									</Typography>
								</MenuItem>
								<MenuItem onClick={() => router.push("/register")}>
									<Typography textAlign="center">
										{t("common:appbar.register")}
									</Typography>
								</MenuItem>
								<MenuItem onClick={() => router.push("/login")}>
									<Typography textAlign="center">
										{t("common:appbar.login")}
									</Typography>
								</MenuItem>
							</Menu>
						</Box>
						<Box sx={{ mr: 2, mt: 1 }}>
							<Image
								src="/uploads/images/logo.png"
								alt="Eventamin"
								height="50"
								width="50"
							/>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
							}}
						>
							<Button
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
								onClick={() => router.push("/")}
							>
								{t("common:appbar.home")}
							</Button>
							<Button
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
								onClick={() => router.push("/about")}
							>
								{t("common:appbar.about")}
							</Button>
							<Button
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
								onClick={() => router.push("/contact")}
							>
								{t("common:appbar.contact")}
							</Button>
							<Button
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
								onClick={() => router.push("/directory")}
							>
								{t("common:appbar.directory")}
							</Button>
							<Button
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
								onClick={() => router.push("/products")}
							>
								{t("common:appbar.products")}
							</Button>
							<Button
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
								onClick={() => router.push("/news")}
							>
								{t("common:appbar.news")}
							</Button>
						</Box>

						{!user && (
							<Hidden mdDown>
								<MenuItem onClick={() => router.push("/register")}>
									{t("common:appbar.register")}
								</MenuItem>
								<MenuItem onClick={() => router.push("/login")}>
									{t("common:appbar.login")}
								</MenuItem>
							</Hidden>
						)}

						<MenuItem onClick={handleSwitchLanguage}>
							<IconButton color="inherit">
								<TranslateIcon />
							</IconButton>
						</MenuItem>
						<MenuItem onClick={darkModeHandler}>
							<IconButton color="inherit">
								{isDark ? <Brightness7Icon /> : <Brightness4Icon />}
							</IconButton>
						</MenuItem>
						<Box sx={{ flexGrow: 0 }}>
							{user && (
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt={user.name} src={Api.url + user.logo} />
									</IconButton>
								</Tooltip>
							)}
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem onClick={() => router.push("/account")}>
									<Typography textAlign="center">
										{t("common:appbar.account")}
									</Typography>
								</MenuItem>
								<MenuItem onClick={actionLogout}>
									<Typography textAlign="center">
										{t("common:logout")}
									</Typography>
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};
export default MainNavbar;
