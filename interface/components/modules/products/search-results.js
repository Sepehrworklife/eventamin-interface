import { Box, ButtonGroup, Divider, Grid, Button } from "@mui/material";
import React from "react";
import { ProductsList } from "./products.list";
import { ProductFilters } from "./product.filters";
import { initialProductsFetch } from "../../../hooks/account/products/search";
import { filterProducts, getMultiProducts } from "../../../services/products";
import useTranslation from "next-translate/useTranslation";
import CircularProgress from "@mui/material/CircularProgress";
import { searchDestinations } from "../../../services/destinations";

export const SearchResults = () => {
	// Hooks
	const { t, lang } = useTranslation();

	// Initial States
	const [noProduct, setNoProduct] = React.useState(false);
	const [skip, setSkip] = React.useState(0);
	const [filters, setFilters] = React.useState({});
	const [products, setProducts] = React.useState([]);
	const [data, setData] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [isPersian, setIsPersian] = React.useState(
		lang === "fa" ? true : false
	);

	const limit = 12;

	function handleNext() {
		skip = skip === 0 ? 1 : skip;
		setSkip(skip + limit);
	}

	function handlePrevious() {
		setNoProduct(false);
		const mth = skip - limit === 1 ? 0 : skip - limit;
		setSkip(mth);
	}

	async function initialProductsFetch() {
		setIsLoading(true);
		await getMultiProducts(limit, skip)
			.then((response) => {
				setProducts(response.data);
				setData(response.data);
			})
			.catch((error) => setNoProduct(true));
		setIsLoading(false);
	}

	async function filterProductsFetch() {
		setIsLoading(true);
		await filterProducts(filters.country, filters.keywords,limit, skip)
			.then((response) => {
				setProducts(response.data);
				setData(response.data);
			})
			.catch((error) => setNoProduct(true));
		setIsLoading(false);
	}

	React.useEffect(() => {
		if (Object.keys(filters).length === 0) initialProductsFetch();
		else filterProductsFetch();
	}, [filters, skip]);

	return (
		<>
			<Grid item xs={12}>
				<ProductFilters setFilters={setFilters} setIsPersian={setIsPersian} isPersian={isPersian} data={data} setProducts={setProducts}/>
				<Divider sx={{ my: 2 }} />
			</Grid>
			<Grid item xs={12} md={8} lg={9}>
				{isLoading ? (
					<Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
						<CircularProgress />
					</Box>
				) : (
					<>
						<ProductsList products={products} />
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								width: "100%",
								mt: 2,
							}}
						>
							<ButtonGroup variant="outlined">
								<Button
									disabled={skip / limit < 1 && true}
									onClick={handlePrevious}
								>
									{t("common:previous")}
								</Button>
								<Button disabled={noProduct} onClick={handleNext}>
									{t("common:next")}
								</Button>
							</ButtonGroup>
						</Box>
					</>
				)}
			</Grid>
		</>
	);
};
