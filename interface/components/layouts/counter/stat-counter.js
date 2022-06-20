import style from "../../../styles/layout/stat-counter.module.scss";
import React from 'react';
import { Box, Container, Grid, Typography } from "@mui/material";
import CountUp from "react-countup";
import useTranslation from "next-translate/useTranslation";

export const StatCounter = () => {
  const { t } = useTranslation("layouts");
	const counterRef = React.useRef();
	const [startCounter, setStartCounter] = React.useState(false);


	React.useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				setStartCounter(true);
				observer.disconnect();
			}
		})
		observer.observe(counterRef.current);

	}, []);
  const items = [
    {
      number: t("counter.first.count"),
      title: t("counter.first.title"),
      description: t("counter.first.content"),
    },
    {
      number: t("counter.second.count"),
      title: t("counter.second.title"),
      description: t("counter.second.content"),
    },
    {
      number: t("counter.third.count"), title: t("counter.third.title"),
      description: t("counter.third.content"),
    },
    {
      number: t("counter.fourth.count"),
      title: t("counter.fourth.title"),
      description: t("counter.fourth.content"),
    },
  ];
  return (
    <Box className={style.stat_counter_container} ref={counterRef}>
      <Container maxWidth="xl">
        <Grid container>
          {startCounter && items.map((item, index) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h1" component="p" color="white">
                  <CountUp start={0} end={item.number} duration={5} />
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  color="white"
                  marginBottom={3}
                >
                  {item.title}
                </Typography>
                <Typography variant="body" component="p" color="white">
                  {item.description}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};
