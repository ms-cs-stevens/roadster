import { Helmet } from "react-helmet";
import { useParams, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Box,
  Container,
  Grid,
  ButtonGroup,
  Typography,
  Button,
} from "@material-ui/core";
import { red, orange, green, blue } from "@material-ui/core/colors";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import ExploreIcon from "@material-ui/icons/Explore";
import MoneyIcon from "@material-ui/icons/Money";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import InfoCard from "./InfoCard.jsx";
import Members from "./Members";
import Description from "./Description";
import Images from "./Images";
import Map from "./Map.jsx";
import Checkpoints from "./ShowCheckpoints.jsx";
import apiService from "../../services/apiService";
import Chat from "./Chat";
import { AuthContext } from "../../firebase/Auth";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();
  const [journey, setJourney] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [routeProperty, setRouteProperty] = useState({
    totalDist: 0,
    totalTime: 0,
  });
  const [allowEdit, setAllowEdit] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const currentUserId = currentUser.uid;

  useEffect(() => {
    async function fetchJourney() {
      const data = await apiService.getResource(`journeys/${id}`);
      const journeyDetails = data.journey;
      setJourney(journeyDetails);
      setLoading(false);

      setAllowEdit(
        journeyDetails.creatorId === currentUserId ||
          (journeyDetails.editable &&
            journeyDetails.users.includes(currentUserId))
      );

      if(journeyDetails.creatorId === currentUser.uid) {
        setUserStatus("(Owner)")
      } else if(journeyDetails.users.includes(currentUser.uid)) {
        setUserStatus("(Member)")
      }

      if (data.invitation) setRequestStatus(data.invitation.status);
    }
    fetchJourney();
  }, [id]);

  const joinJourney = async () => {
    try {
      const data = await apiService.createResource(`requests/${journey._id}`, {
        userId: currentUserId,
        acceptorId: journey.creatorId,
      });
      setRequestStatus(data.invitation.status);
    } catch (error) {
      console.log(error);
    }
  };

  const setDistanceTime = (data) => {
    setRouteProperty(data);
  };

  const accessChat = () => {
    return (
      journey.creatorId === currentUserId ||
      (journey.users && journey.users.includes(currentUserId))
    );
  };

  const generatePdf = () => {
    html2canvas(document.getElementById("journeyDash"), {
      proxy: "server.js",
      useCORS: true,
    }).then(function (canvas) {
      let doc;
      var imgData = canvas.toDataURL("image/jpeg");
      var w = document.getElementById("journeyDash").offsetWidth;
      var h = document.getElementById("journeyDash").offsetHeight;
      doc = new jsPDF("l", "mm", [canvas.height, canvas.width]);
      doc.addImage(imgData, "JPEG", 0, 0, w, h);
      doc.save("Journey_" + id + ".pdf");
    });
  };

  const goToEdit = () => {
    history.push(`/journeys/${journey._id}/edit`);
  };

  if (loading) {
    return "Loading";
  } else {
    return (
      <div>
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
            <br />
            <Grid container direction="row" spacing={5}>
              <Grid item lg={7} sm={6}>
                <Typography component="h2" variant="h5">
                  Roadtrip | {journey.name}&nbsp;{userStatus}
                </Typography>
              </Grid>
              <Grid container justify="flex-end" item lg={5} sm={6}>
                <ButtonGroup
                  variant="text"
                  aria-label="text primary button group"
                >
                  {!allowEdit && requestStatus === "pending" && (
                    <Typography component="h2" variant="h6">
                      Request Sent
                    </Typography>
                  )}
                  {!allowEdit && requestStatus === "" && (
                    <Button
                      onClick={joinJourney}
                      color="primary"
                      variant="outlined"
                    >
                      <PersonAddIcon />
                      Join
                    </Button>
                  )}

                  {allowEdit && (
                    <Button
                      onClick={goToEdit}
                      color="primary"
                      variant="outlined"
                    >
                      <EditIcon />
                      Edit
                    </Button>
                  )}

                  <Button
                    onClick={generatePdf}
                    color="primary"
                    variant="outlined"
                  >
                    <GetAppIcon />
                    Download Journey
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <Grid id="journeyDash" container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <InfoCard
                  title="Total Distance"
                  value={routeProperty.totalDist}
                  icon={<ExploreIcon />}
                  color={orange}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <InfoCard
                  title="Total Time"
                  value={routeProperty.totalTime}
                  icon={<AccessTimeIcon />}
                  color={red}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <InfoCard
                  title="Members"
                  value={journey.occupancy}
                  icon={<PeopleOutlineIcon />}
                  color={green}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <InfoCard
                  title="Tentative Budget"
                  value={"$" + journey.budget}
                  icon={<MoneyIcon />}
                  color={blue}
                />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Map journey={journey} setDistanceTime={setDistanceTime} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <Checkpoints journey={journey} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <Members journeyId={journey._id} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Description journey={journey} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                {accessChat() && <Chat journey={journey} />}
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Images journey={journey} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    );
  }
};

export default Dashboard;
