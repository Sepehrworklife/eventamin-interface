import { Hidden, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Container } from "@mui/material";
import styles from "./sponsors.module.scss";
import Image from "next/image";

const Sponsors = () => {
  return (
    <>
      <Container maxWidth="lg" id={styles.sponsors_container}>
        {SmDownCarousel}
        {MdDownCarousel}
        {lgUpCarousel}
      </Container>
    </>
  );
};

export default Sponsors;

const SmDownCarousel = (
  <Hidden smUp>
    <Carousel
      sx={{ minHeight: "200px" }}
      indicators={false}
      navButtonsAlwaysInvisible={true}
      animation="slide"
      duration={700}
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Image
            src="/uploads/images/sponsors/1.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={6}>
          <Image
            src="/uploads/images/sponsors/2.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Image
            src="/uploads/images/sponsors/3.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={6}>
          <Image
            src="/uploads/images/sponsors/4.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Image
            src="/uploads/images/sponsors/5.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={6}>
          <Image
            src="/uploads/images/sponsors/6.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Image
            src="/uploads/images/sponsors/7.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Carousel>
  </Hidden>
);

const MdDownCarousel = (
  <Hidden smDown mdUp>
    <Carousel
      sx={{ minHeight: "200px" }}
      indicators={false}
      navButtonsAlwaysInvisible={true}
      animation="slide"
      duration={700}
    >
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Image
            src="/uploads/images/sponsors/1.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={3}>
          <Image
            src="/uploads/images/sponsors/2.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={3}>
          <Image
            src="/uploads/images/sponsors/3.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={3}>
          <Image
            src="/uploads/images/sponsors/4.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Image
            src="/uploads/images/sponsors/5.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={3}>
          <Image
            src="/uploads/images/sponsors/6.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={3}>
          <Image
            src="/uploads/images/sponsors/7.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Carousel>
  </Hidden>
);

const lgUpCarousel = (
  <Hidden mdDown>
    <Carousel
      sx={{ minHeight: "200px" }}
      indicators={false}
      navButtonsAlwaysInvisible={true}
      animation="slide"
      duration={700}
    >
      <Grid container spacing={3} columns={7}>
        <Grid item xs={1}>
          <Image
            src="/uploads/images/sponsors/1.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={1}>
          <Image
            src="/uploads/images/sponsors/2.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={1}>
          <Image
            src="/uploads/images/sponsors/3.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={1}>
          <Image
            src="/uploads/images/sponsors/4.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={1}>
          <Image
            src="/uploads/images/sponsors/5.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={1}>
          <Image
            src="/uploads/images/sponsors/6.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
        <Grid item xs={1}>
          <Image
            src="/uploads/images/sponsors/7.png"
            height="200"
            width="200"
            alt="sponsors"
          />
        </Grid>
      </Grid>
    </Carousel>
  </Hidden>
);
