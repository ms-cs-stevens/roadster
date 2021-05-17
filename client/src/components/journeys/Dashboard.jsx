import { Helmet } from "react-helmet";
import { Box, Container, Grid, Typography, Button } from "@material-ui/core";
import InfoCard from "./InfoCard.jsx";
import Members from "./Members";
import Details from "./Details";
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
  const [routeProperty, setRouteProperty] = useState({});

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

  const generatePdf = () => {
    html2canvas(document.getElementById("root"), {
      proxy: "server.js",
      useCORS: true,
    }).then(function (canvas) {
      let doc;
      var imgData = canvas.toDataURL("image/jpeg");
      var w = document.getElementById("root").offsetWidth;
      var h = document.getElementById("root").offsetHeight;
      doc = new jsPDF("l", "mm", [canvas.height, canvas.width]);
      doc.addImage(imgData, "JPEG", 0, 0, w, h);
      doc.save("Journey_" + id + ".pdf");
    });
  };

  if (loading) {
    return "Loading";
  } else {
    return (
      <>
        <Helmet>
          <title>Roadster | Journey Dashboard</title>
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
              Journey Dashboard
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <InfoCard
                  title="Total Distance"
                  value={routeProperty.totalDist}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <InfoCard title="Total Time" value={routeProperty.totalTime} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <InfoCard title="Members" value={journey.occupancy} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <InfoCard title="Tentative Budget" value={journey.budget} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Map journey={journey} setDistanceTime={setDistanceTime} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <TimeLine journey={journey} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <Members journey={journey} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Details journey={journey} />
              </Grid>
            </Grid>
            <Button
              data-html2canvas-ignore="true"
              onClick={generatePdf}
              variant="contained"
              color="primary"
            >
              Download Trip Details
            </Button>
          </Container>
        </Box>
      </>
    );
  }
};

export default Dashboard;
