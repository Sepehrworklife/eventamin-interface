import React from "react";
import FormSkeleton from "../../elements/skeleton/form";
import { DataGrid, faIR, enUS } from "@mui/x-data-grid";
import useTranslation from "next-translate/useTranslation";
import Authenticate from "../../../utils/authenticate";
import { useRouter } from "next/router";
import { countries } from "../../../constants/countries";
import { CountryDetector } from "../../../utils/country";
import { Typography } from "@mui/material";
import {getMessageWithReceiverID} from "../../../services/messages";

export function ResultTable(props) {
	const { t, lang } = useTranslation("account");
	const [data, setData] = React.useState([]);
	const auth = new Authenticate();
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setIsLoading(true);
		let initialData = [];
		let error;
		await getMessageWithReceiverID(auth.getUserData().id)
			.then((result) => (initialData = result.data))
			.catch((error) => {
				error = true;
			});
		if (error === true) return;
		let preparedData = [];
		initialData.map((obj, index) => {
			let date = new Date(obj.created_datetime);
			if(lang === 'en')date = date.toLocaleDateString();
			if(lang === 'fa')date = date.toLocaleDateString('fa-IR');
			preparedData.push({
				id: obj.id,
				from: obj.name,
				email: obj.email,
				datetime: date,
				description: obj.description.slice(0,64) + "...",
			});
		});
		setData(preparedData);
		setIsLoading(false);
	};
	const columns = [
		{
			field: "from",
			headerName: t("message.from_column"),
			flex: 1,
		},
		{
			field: "email",
			headerName: t("message.email_column"),
			flex: 1,
		},
		{
			field: "description",
			headerName: t("message.description_column"),
			flex: 1,
		},
		{
			field: "datetime",
			headerName: t("message.datetime_column"),
			flex: 1,
		},
	];
	return (
		<>
			{isLoading ? (
				<div style={{ marginTop: 15 }}>
					<FormSkeleton />
					<FormSkeleton />
				</div>
			) : data.length < 1 ? (
				<Typography variant="body" components="p" align="center">
					{t("message.table_result_not_found")}
				</Typography>
			) : (
				<DataGrid
					autoHeight
					localeText={
						lang === "fa"
							? faIR.components.MuiDataGrid.defaultProps.localeText
							: enUS.components.MuiDataGrid.defaultProps.localeText
					}
					pageSize={props.pageSize}
					rows={data && data}
					rowsPerPageOptions={props.rowsPerPageOptions}
					columns={columns}
					onRowClick={(params, event) => {
						router.push("/account/message/" + params.id);
					}}
				/>
			)}
		</>
	);
}
