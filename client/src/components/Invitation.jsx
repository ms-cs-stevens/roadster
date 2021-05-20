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
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const Invitation = (props) => {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  let currentUserId = currentUser.uid;

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await apiService.getResource(`requests`);
        console.log(data);

        setJourneys(data.journeys);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [currentUserId]);


  const renderInvitationList = () => {
    let invitationList;

    if(journeys.length > 0) {
      invitationList = journeys.map((journey) => {
        console.log(journey)
        return (
          <>
            <ListItem>
              {/* <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar> */}
              <ListItemText
                primary={journey.name}
                secondary= " — I'll be in your neighborhood doing errands this…"
              />



            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      });

      invitationList = <List className={classes.root}>
        {invitationList}
      </List>
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
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                Invitations
              </Typography>
            </Grid>
          </Grid>
          <Grid >
          </Grid>
            {/* {renderInvitationList()} */}
        </Container>
      </>
    );
  }
};

export default Invitation;
