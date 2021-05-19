import {
  Card,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  ListItemText,
  makeStyles,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { useEffect, useState, useContext } from "react";
import apiService from "../services/apiService";
import { deepPurple } from "@material-ui/core/colors";
import { AuthContext } from "../firebase/Auth";
import { NavLink } from "react-router-dom";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: deepPurple[800],
  },
}));

const Invitation = (props) => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  let currentUserId = currentUser.uid;

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await apiService.getResource(`requests`);
        setInvitations(data.invitations);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [currentUserId]);


  const renderInvitationList = () => {
    let invitationList;

    if(invitations.length > 0) {
      invitationList = invitations.map((invitation) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary= " — I'll be in your neighborhood doing errands this…"
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      });
    } else {
      invitationList = <Typography variant="body2">No Invitations yet</Typography>;
    }
    return invitationList;
  };

  if (loading) {
    return "Loading";
  } else {
    return (
      <>
        <Helmet>
          <title>Roadster | Invitations </title>
        </Helmet>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography component="h1" variant="h5">
                Invitations
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            {renderInvitationList()}
          </Grid>
        </Container>
      </>
    );
  }
};

export default Invitation;
