import React from "react";
import FormSkeleton from "../../elements/skeleton/form";
import { DataGrid, faIR, enUS } from "@mui/x-data-grid";
import useTranslation from "next-translate/useTranslation";
import { fetchDestinationByUser } from "../../../services/destinations";
import Authenticate from "../../../utils/authenticate";
import { useRouter } from "next/router";
import { countries } from "../../../constants/countries";
import { CountryDetector } from "../../../utils/country";
import {Typography} from "@mui/material";

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
		await fetchDestinationByUser(auth.getUserData().id)
			.then((result) => (initialData = result.data))
			.catch((error) =>  {
				error = true;
			});
		if (error === true) return;
		let preparedData = [];
		initialData.map((obj, index) => {
			let country;
			countries.map((cn) => {
				if (cn.code === obj.country) country = CountryDetector(cn.code, lang);
			});
			preparedData.push({
				id: obj.id,
				country: country ? country : "Unknown",
				city: obj.city,
			});
		});
		if(preparedData.length >= 2) props.disabledButton(true);
		setData(preparedData);
		setIsLoading(false);
	};
	const columns = [
		{
			field: "country",
			headerName: t("destination.country_column"),
			flex: 1,
		},
		{
			field: "city",
			headerName: t("destination.city_column"),
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
					{t("destination.table_result_not_found")}
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
						router.push("/account/destination/" + params.id);
					}}
				/>
			)}
		</>
	);
}
