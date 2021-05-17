import { Box, Container, Grid, Typography } from "@material-ui/core";
import Budget from "./Budget.jsx";
import Members from "./Members";
import Map from "./Map.jsx";
import TimeLine from "./Timeline.jsx";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";

const Dashboard = () => {
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

  if (loading) {
    return "Loading!!";
  } else {
    return (
      <>
        <br />
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <Typography component="h2" variant="h5">
              Journey Dashboard
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Budget />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Budget />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Budget />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Budget />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Map journey={journey} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <TimeLine journey={journey} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <Members journey={journey} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                Show journey details here, description etc.
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
};

export default Dashboard;
