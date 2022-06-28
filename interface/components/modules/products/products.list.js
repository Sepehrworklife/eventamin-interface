import { Grid } from "@mui/material";
import React from "react";
import { ProductCard } from "./product.card";
const Api = require("../../../constants/api.json");

export const ProductsList = ({ products = [] }) => {
	return (
		<Grid container spacing={2} sx={{alignItems: 'stretch'}}>
			{products.map((product, index) => {
				let images = null;
				let attachments = null;
				let countries = [];
				if (product.images !== "" && product.image !== "null")
					images = product.images?.split(",");
				if (product.attachments !== "" && product.image !== "null")
					attachments = product.attachments?.split(",");
				if (product.destinations !== "" && product.destinations !== null) {
					product.destinations.map((destination, index) => {
						countries.push(destination?.country);
					});
				}
				return (
					<Grid key={index} item xs={12} sm={6} md={4}>
						<ProductCard
							title={product.title}
							content={product.description}
							images={images}
							company={product.user.company}
							attachments={attachments}
							countries={countries}
							userId={product.user_id}
							company_fa={product.user.company_fa}
							logo={product.user.logo}
						/>
					</Grid>
				);
			})}
		</Grid>
	);
};
