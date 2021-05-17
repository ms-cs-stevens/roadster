import { Helmet } from "react-helmet";
import React, { useEffect, useState, useReducer } from "react";
import { Box, Container, Grid, Typography, Button } from "@material-ui/core";
import InfoCard from "./InfoCard.jsx";
import Members from "./Members";
import Details from "./Details";
import Map from "./Map.jsx";
import TimeLine from "./Timeline.jsx";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";
import AddCheckpoints from "./AddCheckpoints.jsx";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const EditJourney = () => {
  const { id } = useParams();
  const [journey, setJourney] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [routeProperty, setRouteProperty] = useState({});
  const [formData, setFormData] = useReducer(formReducer, { editable: false, checkpoints: [] });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Fix below condition for form submission and set form error
    if (
      !formData ||
      !formData.origin ||
      !formData.destination ||
      formData.budget.length === 0 ||
      formData.occupancy.length === 0 ||
      formData.name.length === 0
    )
      return;

    setSubmitting(true);

    try {
      const journey = await apiService.createResource("journeys", formData);
      // history.push(`/journeys/${journey._id}`);
    } catch (e) {
      console.log(e);
      // TODO: set error on form
      alert("Provide correct values");
      setSubmitting(false);
    }

    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";

    setFormData({
      name: event.target.name,
      value: isCheckbox
        ? event.target.checked
        : (event.detail && event.detail.location) || event.target.value,
    });
  };

  useEffect(() => {
    async function fetchJourney() {
      let data = await apiService.getResource(`journeys/${id}`);
      setJourney(data);
      setLoading(false);
    }
    fetchJourney();
  }, [id]);

  const setDistanceTime = (data) => {
    setRouteProperty(data);
  };

  if (loading) {
    return "Loading";
  } else {
    return (
      <>
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
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Map journey={journey} setDistanceTime={setDistanceTime} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <AddCheckpoints journey={journey} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <Members journey={journey} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Details journey={journey} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
};

export default EditJourney;
