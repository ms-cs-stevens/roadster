import { Helmet } from "react-helmet";
import React, { useEffect, useState, useReducer, useContext } from "react";
import { Box, Container, Grid, Typography, Button } from "@material-ui/core";
import InfoCard from "./InfoCard.jsx";
import Members from "./Members";
import Map from "./Map.jsx";
import TimeLine from "./Timeline.jsx";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";
import AddCheckpoints from "./AddCheckpoints.jsx";
import JourneyContext from "../../contexts/JourneyContext";

// const formReducer = (state, event) => {
//   return {
//     ...state,
//     [event.name]: event.value,
//   };
// };

const EditJourney = () => {
  const { id } = useParams();
  const [journey, setJourney] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const trip = useContext(JourneyContext);
  const [routeProperty, setRouteProperty] = useState({});
  // const [formData, setFormData] = useReducer(formReducer, { editable: false, checkpoints: [] });
  // const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchJourney() {
      let data = await apiService.getResource(`journeys/${id}`);
      trip.journeyId = data._id;
      trip.origin = data.origin;
      trip.destination = data.destination;
      setJourney(data);
      setLoading(false);
    }
    fetchJourney();
  }, [trip, id]);

  const setDistanceTime = (data) => {
    setRouteProperty(data);
  };

  if (loading) {
    return "Loading";
  } else {
    return (
      <JourneyContext.Provider value={trip}>
        <Helmet>
          <title>Roadster | Edit Journey</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container maxWidth="lg">
            <Typography component="h2" variant="h5">
              Edit Journey
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={7} md={12} xl={9} xs={12}>
                <Map journey={trip} setDistanceTime={setDistanceTime} />
              </Grid>
              <Grid item lg={5} md={6} xl={3} xs={12}>
                <AddCheckpoints />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <Members journey={journey} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </JourneyContext.Provider>
    );
  }
};

export default EditJourney;
