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
import {ResultTable} from "../../../components/modules/product/table-result";
import BaseTemplate from "../../../components/templates/base";
import Authenticate from "../../../utils/authenticate";
import Head from 'next/head';

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
				<title>{t("head:account.products.title")}</title>
				<meta name="description" content={t("head:account.products.description")}/>
				<meta name="keywords" content={t("head:account.products.keywords")}/>
			</Head>

		<BaseTemplate accountMenu>
			<Card>
					<CardHeader
						title={t("product.page_title")}
					action={<Button variant="contained" onClick={() => router.push('/account/product/create')}>{t("product.add_new_button")}</Button>}
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
