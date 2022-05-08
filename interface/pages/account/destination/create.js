import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	Button,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import BaseTemplate from "../../../components/templates/base";
import Authenticate from "../../../utils/authenticate";
import { useRouter } from "next/router";
import CreateForm from '../../../components/modules/destination/create-form';

const CreateDestination = () => {
	const { t, lang } = useTranslation("account");
	const auth = new Authenticate();
	const router = useRouter();

	React.useEffect(() => {
		auth.checkAccess(["provider"]);
	}, []);

	return (
		<BaseTemplate accountMenu>
			<Card>
				<CardHeader
					title={t("destination.create.page_title")}
					action={
						<Button variant="outlined" onClick={() => router.back()}>
							{t("common:go_back_text")}
						</Button>
					}
				/>
				<Divider />
				<CardContent>
					<CreateForm />
				</CardContent>
			</Card>
		</BaseTemplate>
	);
};

export default CreateDestination;
