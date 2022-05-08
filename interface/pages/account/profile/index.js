import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@mui/material";
import Authenticate from "../../../utils/authenticate";
import React from "react";
import BaseTemplate from "../../../components/templates/base";
import UserForm from "../../../components/forms/account/profile/user";
import Head from "next/head";
import ProviderForm from "../../../components/forms/account/profile/provider";
import useTranslation from 'next-translate/useTranslation';

const roleHasAccess = ["provider", "buyer"];
const Profile = () => {
	const {t} = useTranslation();
	const auth = new Authenticate();
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		auth.checkAccess(roleHasAccess);
		setUser(auth.getUserData());
	}, []);

	return (
		<>
			<Head>
				<title>{t("head:account.profile.title")}</title>
				<meta name="description" content={t("head:account.profile.description")} />
				<meta name="keywords" content={t("head:account.profile.keywords")} />
			</Head>
			<BaseTemplate accountMenu>
				<Card>
					<CardContent>
						<UserForm />
					</CardContent>
				</Card>
				{user && user.role === "provider" && (
					<Card sx={{ my: 6 }}>
						<CardContent>
							<ProviderForm />
						</CardContent>
					</Card>
				)}
			</BaseTemplate>
		</>
	);
};

export default Profile;
