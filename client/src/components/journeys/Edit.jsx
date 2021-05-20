import { Helmet } from "react-helmet";
import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Box, Container, Grid, Typography, Button } from "@material-ui/core";
import Members from "./Members";
import Map from "./Map.jsx";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";
import AddCheckpoints from "./AddCheckpoints.jsx";
import EditJourneyDetails from "./EditJourneyDetails";
import { AuthContext } from "../../firebase/Auth";

const EditJourney = () => {
  const { id } = useParams();
  const [journey, setJourney] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchJourney() {
      let data = await apiService.getResource(`journeys/${id}`);
      setJourney(data.journey);
      setLoading(false);
    }
    fetchJourney();
  }, [id]);

  const setCheckpoints = (checkpoints) => {
    setJourney({ ...journey, checkpoints: checkpoints });
  };

  const updateJourneyDetails = (updatedJourney) => {
    setJourney(updatedJourney);
  };

  const setDistanceTime = (data) => {
    // setRouteProperty(data);
  };

  const currentUserOwner = () => {
    if (!journey) return false;
    return currentUser.uid === journey.creatorId;
  };

  const preventCurrentUserToEdit = () => {
    if (!journey) return false;
    return (
      currentUser.uid !== journey.creatorId &&
      (!journey.editable || !journey.users.includes(currentUser.uid))
    );
  };

  if (preventCurrentUserToEdit()) {
    return <Redirect to={`/journeys/${journey._id}`} />;
  }

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
            <br />
            <Grid container direction="row" spacing={5}>
              <Grid item lg={7} sm={6}>
                <Typography component="h2" variant="h5">
                  Edit {journey.name}
                </Typography>
              </Grid>
              <Grid container justify="flex-end" item lg={5} sm={6}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  Go Back to Journey
                </Button>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item lg={7} md={12} xl={9} xs={12}>
                <Map journey={journey} setDistanceTime={setDistanceTime} />
              </Grid>
              <Grid item lg={5} md={6} xl={3} xs={12}>
                <AddCheckpoints
                  setCheckpoints={setCheckpoints}
                  journey={journey}
                />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <Members
                  journeyId={journey._id}
                  showSearch={currentUserOwner()}
                />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <EditJourneyDetails
                  journey={journey}
                  updateJourneyDetails={updateJourneyDetails}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
};

export default EditJourney;
