import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Button, Hidden } from "@mui/material";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import Authenticate from "../../utils/authenticate";

export default function AccountMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [user, setUser] = React.useState(null);
	const router = useRouter();
	const {t, lang} = useTranslation('common');
	const open = Boolean(anchorEl);
	const auth = new Authenticate();

	React.useEffect(() => {
		setUser(auth.getUserData())
	}, [])

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<React.Fragment>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					textAlign: "center",
					my: 3,
				}}
			>
				<Hidden lgDown>
					<Button onClick={() => router.push('/account')}>{t("accountmenu.dashboard")}</Button>
					<Button onClick={() => router.push('/account/profile')}>{t("accountmenu.profile")}</Button>
					{user && user.role === "provider" && <Button onClick={() => router.push('/account/destination')}>{t("accountmenu.destinations")}</Button>}
					{user && user.role === "provider" && <Button onClick={() => router.push('/account/product')}>{t("accountmenu.products")}</Button> }
					<Button onClick={() => router.push('/account/message')}>{t("accountmenu.messages")}</Button>
				</Hidden>
				<Hidden lgUp={true}>
					<Tooltip title="Account settings" sx={{ textAlign: "center" }}>
						<IconButton
							onClick={handleClick}
							size="lg"
							aria-controls={open ? "account-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
						>
							<MenuIcon />
						</IconButton>
					</Tooltip>
				</Hidden>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem onClick={() => router.push('/account')}>
					{t("accountmenu.dashboard")}
				</MenuItem>
				<MenuItem onClick={() => router.push('/account/profile')}>
					{t("accountmenu.profile")}
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => router.push('/account/destination')}>
					{t("accountmenu.destinations")}
				</MenuItem>
				<MenuItem onClick={() => router.push('/account/product')}>
					{t("accountmenu.products")}
				</MenuItem>
				<MenuItem onClick={() => router.push('/account/message')}>
					{t("accountmenu.messages")}
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
