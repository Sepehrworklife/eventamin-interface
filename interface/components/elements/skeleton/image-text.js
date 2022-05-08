import { Skeleton } from "@mui/material";


const ImageTextSkeleton = () => {
	return (
			<>
					<Skeleton variant="rectangular" height={200} />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton width="60%" />
			</>
	)
}


export default ImageTextSkeleton;
