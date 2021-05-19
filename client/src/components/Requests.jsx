import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  Typography,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import apiService from "../services/apiService";
import { deepPurple } from "@material-ui/core/colors";
import { AuthContext } from "../firebase/Auth";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: deepPurple[800],
  },
}));

const Request = (props) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  let currentUserId = currentUser.uid;

  useEffect(() => {
    async function fetchData() {
      let data = await apiService.getResource(`requests/sent/${currentUserId}`);
      setRequests(data);
      setLoading(false);
    }
    fetchData();
  }, [currentUserId]);

  const renderRequestList = () => {
    if (requests.length) {
      return requests.map((request, i) => (
        <List>
          <ListItem divider={i < request.length - 1} key={request._id}>
            <ListItemText
              primary={
                <NavLink to={`/journeys/${request.journeyId}`}>
                  {" "}
                  Journey
                </NavLink>
              }
            />
          </ListItem>
        </List>
      ));
    } else {
      return <Typography variant="body2">No Invitations yet</Typography>;
    }
  };
  if (loading) {
    return "Loading";
  } else {
    return (
      <Card {...props}>
        <CardHeader subtitle={`${requests.length} in total`} title="Requests" />
        <Divider />
        {renderRequestList()}
        <Divider />
      </Card>
    );
  }
};

export default Request;
