import { Card, CardContent, Grid, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

import styles from "./card-icon.module.scss";

const CardIcon = ({ title, content, icon }) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.item}>
      <CardContent className={styles.item_content}>
        <Typography
          variant="h2"
          component="div"
          align="center"
          className={styles.icon}
        >
          {icon}
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          fontWeight="600"
          marginBottom={1}
        >
          {title}
        </Typography>
        <Typography variant="body1" component="p" fontWeight="200">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardIcon;
