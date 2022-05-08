import { Card, Grid, Skeleton, Typography } from "@mui/material";

const CardSkeleton = ({marginBottom}) => {
	return (
		<Card sx={{ width: 1, marginBottom: marginBottom }}>
			<Grid container>
				<Grid item xs={12} sm={3}>
					<Skeleton variant="rectangular" width="100%" height={180} />
				</Grid>
				<Grid item xs={12} sm={9} sx={{ p: 2 }}>
					<Typography variant="h6" marginTop={1}>
						<Skeleton width={120} />
					</Typography>
					<Typography variant="body2" marginBottom={1}>
						<Skeleton />
						<Skeleton />
						<Skeleton width="50%" />
					</Typography>
					<Typography marginBottom={1}></Typography>
				</Grid>
			</Grid>
		</Card>
	);
};

export default CardSkeleton;
