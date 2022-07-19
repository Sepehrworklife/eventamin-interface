import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import Link from "next/link";

const CardImage = ({ title, link, imageSrc, buttonText, sx, ...props }) => {
  return (
    <Card sx={sx ? sx : null}>
      <CardMedia component="img" image={imageSrc} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontWeight="600">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.children}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={link ? link : "#"}>
          <Button size="small">{buttonText}</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardImage;
