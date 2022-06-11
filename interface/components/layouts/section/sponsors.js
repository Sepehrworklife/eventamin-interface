import { Container, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export const SponsorsSection = () => {
  return (
    <Container maxWidth="xl">
      <Carousel navButtonsAlwaysVisible indicators={false} animation="slide">
        <Grid>
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
        </Grid>
        <Grid>
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
        </Grid>
        <Grid>
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
          <img src="https://picsum.photos/200/200" />
        </Grid>
      </Carousel>
    </Container>
  );
};
