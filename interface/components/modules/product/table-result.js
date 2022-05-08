import React from "react";
import FormSkeleton from "../../elements/skeleton/form";
import { DataGrid, faIR, enUS } from "@mui/x-data-grid";
import useTranslation from "next-translate/useTranslation";
import Authenticate from "../../../utils/authenticate";
import { useRouter } from "next/router";
import { countries } from "../../../constants/countries";
import { CountryDetector } from "../../../utils/country";
import { Typography } from "@mui/material";
import { getProductWithUserID } from "../../../services/products";

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
		await getProductWithUserID(auth.getUserData().id)
			.then((result) => (initialData = result.data))
			.catch((error) => {
				error = true;
			});
		if (error === true) return;
		let preparedData = [];
		initialData.map((obj, index) => {
			preparedData.push({
				id: obj.id,
				title: obj.title,
				description: obj.description.slice(0,64) + "...",
			});
		});
		setData(preparedData);
		setIsLoading(false);
	};
	const columns = [
		{
			field: "title",
			headerName: t("product.title_column"),
			flex: 1,
		},
		{
			field: "description",
			headerName: t("product.description_column"),
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
					{t("product.table_result_not_found")}
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
						router.push("/account/product/" + params.id);
					}}
				/>
			)}
		</>
	);
}
