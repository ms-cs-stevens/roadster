import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Box,
  Button,
  Container,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import apiService from "../services/apiService";
import { deepPurple } from "@material-ui/core/colors";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: deepPurple[800],
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const Invitation = (props) => {
  const classes = useStyles();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  let currentUserId = currentUser.uid;

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await apiService.getResource(`requests`);
        console.log(data);
        setInvitations(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [currentUserId]);

  const acceptInvitation = async (invite) => {
    try {
      let data = await apiService.editResource(`requests/${invite._id}/accept`);
      console.log(data);
      history.push(`/journeys/${invite.journeyId}`);
    } catch (error) {
      console.log(error);
    }
  }

  const rejectInvitation = async (invite) => {
    try {
      let data = await apiService.editResource(`requests/${invite._id}/reject`);
      console.log(data);
      history.push(`/journeys/${invite.journeyId}`);

    } catch (error) {
      console.log(error);
    }
  }

  const renderInvitations = () => {
    if (invitations && invitations.length) {
      return invitations.map((invite, i) => (
        <ListItem divider={i < invitations.length - 1} key={invite._id}>
          <ListItemAvatar>
            <Avatar
              alt={invite.user.firstName}
              src={invite.user.profileImage}
              className={classes.avatar}
            >
              {invite.user.firstName[0] + invite.user.lastName[0]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={invite.user.firstName + " " + invite.user.lastName}
          />
          <ListItemText
            primary={
              <NavLink
                aria-label="journey link"
                style={{ textDecoration: "none" }}
                to={`/journeys/${invite.journey._id}`}
              >
                {invite.journey.name}
              </NavLink>
            }
          />
          <ListItemText
            primary={
              invite.invitation.status === "pending" ? (<>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={(e) => acceptInvitation(invite.invitation)}
                  className={classes.submit}
                >
                  Accept
                </Button>
                &nbsp;
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={(e) => rejectInvitation(invite.invitation)}
                  className={classes.submit}
                >
                  Reject
                </Button>
              </>)
               : invite.status
            }
          />
        </ListItem>
      ));
    } else {
      return <ListItem>No Requests for your journeys yet.</ListItem>;
    }
  };

  if (loading) {
    return "Loading";
  } else {
    return (
      <div>
        <Helmet>
          <title>Roadster | Requests</title>
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
            <Card>
              <CardHeader
                subtitle={`${invitations && invitations.length} in total`}
                title="Invitations"
              />
              <Divider />
              <br />
              <List>{renderInvitations()}</List>
              <Divider />
            </Card>
          </Container>
        </Box>
      </div>
    );
  }
};

export default Invitation;
