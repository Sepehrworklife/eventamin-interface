import {
	Button,
	Alert,
	AlertTitle,
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

	const [disabled, setDisabled] = React.useState(false);

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
			{disabled && 
						<Alert severity="success" variant="filled" sx={{ mb: 2 }}>
							<AlertTitle>{t("upgrade_now_title")}</AlertTitle>
							{t("upgrade_now_desc")}
							<Button variant="standard" size="small">
								{t("upgrade_now_link")}
							</Button>
						</Alert>
						}
			<Card>
					<CardHeader
						title={t("destination.page_title")}
					action={<Button variant="contained" disabled={disabled} onClick={() => router.push('/account/destination/create')}>{t("destination.add_new_button")}</Button>}
					/>
					<Divider />
				<CardContent>
					<ResultTable pageSize={10} rowsPerPageOptions={[10]} disabledButton={setDisabled}/>
				</CardContent>
			</Card>
		</BaseTemplate>
</>
	);
};

export default Destination;
