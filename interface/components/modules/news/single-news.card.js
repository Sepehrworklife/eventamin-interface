import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation';

export const SingleNewsCard = ({ title, excerpt, link, thumbnail }) => {
	const { t, lang } = useTranslation('news');
	return (
		<Card>
			<CardMedia component="img"  image={thumbnail} alt={title} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{excerpt}
				</Typography>
			</CardContent>
			<CardActions>
				<Link href={link}>
					<Button size="small">{t("read_more")}</Button>
				</Link>
			</CardActions>
		</Card>
	);
};
