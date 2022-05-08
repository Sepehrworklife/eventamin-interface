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
import {ResultTable} from "../../../components/modules/message/table-result";
import BaseTemplate from "../../../components/templates/base";
import Authenticate from "../../../utils/authenticate";
import Head from 'next/head';

const Message = (props) => {
	const { t, lang } = useTranslation("account");
	const auth = new Authenticate();
	const router = useRouter();

	React.useEffect(() => {
		auth.checkAccess(["provider", "buyer"]);
	});
	return (
		<>

			<Head>
				<title>{t("head:account.messages.title")}</title>
				<meta name="description" content={t("head:account.messages.description")}/>
				<meta name="keywords" content={t("head:account.messages.keywords")}/>
			</Head>
		<BaseTemplate accountMenu>
			<Card>
					<CardHeader
						title={t("message.page_title")}
					/>
					<Divider />
				<CardContent>
					<ResultTable pageSize={15} rowsPerPageOptions={[15]}/>
				</CardContent>
			</Card>
		</BaseTemplate>
</>
	);
};

export default Message;
