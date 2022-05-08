import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import React from "react";
import {ResultTable} from "../../../components/modules/destination/table-result";
import BaseTemplate from "../../../components/templates/base";
import Head from 'next/head';
import Authenticate from "../../../utils/authenticate";

const Destination = (props) => {
	const { t, lang } = useTranslation("account");
	const auth = new Authenticate();
	const router = useRouter();

	React.useEffect(() => {
		auth.checkAccess(["provider"]);
	});
	return (
		<>

			<Head>
				<title>{t("head:account.destinations.title")}</title>
				<meta name="description" content={t("head:account.destinations.description")}/>
				<meta name="keywords" content={t("head:account.destinations.keywords")}/>
			</Head>
		<BaseTemplate accountMenu>
			<Card>
					<CardHeader
						title={t("destination.page_title")}
					action={<Button variant="contained" onClick={() => router.push('/account/destination/create')}>{t("destination.add_new_button")}</Button>}
					/>
					<Divider />
				<CardContent>
					<ResultTable pageSize={10} rowsPerPageOptions={[10]}/>
				</CardContent>
			</Card>
		</BaseTemplate>
</>
	);
};

export default Destination;
