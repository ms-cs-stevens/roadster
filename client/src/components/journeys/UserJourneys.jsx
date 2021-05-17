import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import CardItem from "./CardItem";
import { NavLink } from "react-router-dom";

const UserJourneys = () => {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { journeys } = await apiService.getResource("journeys");
        setJourneys(journeys);
      } catch (e) {
        // TODO: Throw error and render component
        console.log("Not Found");
      }
    }
    fetchData();
  }, []);

  const buildCards = () => {
    let cards =
      journeys.length > 0 &&
      journeys.map((journey) => {
        return (
          <Grid container item xs={12} sm={6} md={3} xl={2} key={journey._id}>
            <NavLink
              style={{ textDecoration: "none" }}
              to={`/journeys/${journey._id}`}
            >
              <CardItem journey={journey} />
            </NavLink>
          </Grid>
        );
      });

    return (
      <Grid container spacing={2}>
        {cards}
      </Grid>
    );
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Typography component="h1" variant="h5">
        My Journeys
      </Typography>
      {buildCards()}
    </Container>
  );
};

export default UserJourneys;
