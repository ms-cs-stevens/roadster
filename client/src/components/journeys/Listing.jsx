import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import JourneyCard from "./JourneyCard";
import { Helmet } from "react-helmet";
import {
  Grid,
  makeStyles,
  CssBaseline,
  InputLabel,
  Container,
  FormControl,
  Select,
  Typography,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "0 5em",
  },
  formControl: {
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const JourneyListing = () => {
  const classes = useStyles();
  const [journeys, setJourneys] = useState([]);
  const [filter, setFilter] = useState("user");

  useEffect(() => {
    async function fetchData() {
      try {
        const { journeys } = await apiService.getResource(
          `journeys?filter=${filter}`
        );
        setJourneys(journeys);
      } catch (e) {
        // TODO: Throw error and render component
        console.log("Not Found");
      }
    }
    fetchData();
  }, [filter]);

  const buildCards = () => {
    let cards =
      journeys.length > 0 &&
      journeys.map((journey) => {
        return (
          <Grid item md={4} xl={3} xs={12} key={journey._id}>
            <JourneyCard journey={journey} />
          </Grid>
        );
      });

    return cards;
  };

  return (
    <>
      <Helmet>
        <title>Roadster | Journeys</title>
      </Helmet>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography component="h1" variant="h5">
              Journeys
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item container justify="flex-end" xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel
                id="demo-simple-select-label"
                className={classes.formControl}
                shrink
              >
                Filter
              </InputLabel>

              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={classes.selectEmpty}
              >
                <MenuItem value="user"> My Journeys </MenuItem>
                <MenuItem value="all"> All Journeys </MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          {buildCards()}
        </Grid>
      </Container>
    </>
  );
};

export default JourneyListing;
