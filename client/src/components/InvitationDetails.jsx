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
import { useEffect, useState, useContext } from "react";
import apiService from "../services/apiService";
import { deepPurple } from "@material-ui/core/colors";
import { Helmet } from "react-helmet";
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

const Invitation = ({ invite }) => {
  const classes = useStyles();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
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

  const acceptInvitation = async (inviteId, i) => {
    try {
      let data = await apiService.editResource(`requests/${inviteId}/accept`);
      invitat
      console.log(data);
      setInvitations(data);
    } catch (error) {
      console.log(error);
    }
  }

  const rejectInvitation = async (inviteId) => {
    requests/:id/reject
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
              invite.journey.name
            }
          />
          <ListItemText
            primary={
              <>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={(e) => acceptInvitation(invite._id, i)}
                  className={classes.submit}
                >
                  Accept
                </Button>
                &nbsp;
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={(e) => rejectInvitation(invite._id)}
                  className={classes.submit}
                >
                  Reject
                </Button>
              </>
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
