import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import Members from "./Members";
import Map from "./Map.jsx";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";
import AddCheckpoints from "./AddCheckpoints.jsx";

const EditJourney = () => {
  const { id } = useParams();
  const [journey, setJourney] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJourney() {
      let data = await apiService.getResource(`journeys/${id}`);
      setJourney(data);
      setLoading(false);
    }
    fetchJourney();
  }, [id]);

  const setCheckpoints = (checkpoints) =>{
    setJourney({...journey, checkpoints: checkpoints});
  }

  const setDistanceTime = (data) => {
    // setRouteProperty(data);
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
              <Grid item lg={7} md={12} xl={9} xs={12}>
                <Map journey={journey} setDistanceTime={setDistanceTime} />
              </Grid>
              <Grid item lg={5} md={6} xl={3} xs={12}>
                <AddCheckpoints setCheckpoints={setCheckpoints} journey={journey}/>
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <Members journey={journey} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
};

export default EditJourney;
