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
} from "@material-ui/core";
import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: deepPurple[800],
  },
}));

const Members = (props) => {
  const journeyId = props.journeyId;
  const [members, setMembers] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      let data = await apiService.getResource("users");
      setMembers(data);
      setLoading(false);
    }
    fetchData();
  }, [journeyId]);

  if (loading) {
    return "Loading";
  } else {
    return (
      <Card {...props}>
        <CardHeader subtitle={`${members.length} in total`} title="Members" />
        <Divider />
        <List>
          {members.map((member, i) => (
            <ListItem divider={i < members.length - 1} key={member._id}>
              <ListItemAvatar>
                <Avatar
                  alt={member.firstName}
                  src={member.profileImage}
                  className={classes.avatar}
                >
                  {member.firstName[0] + member.lastName[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member.firstName + " " + member.lastName}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Card>
    );
  }
};

export default Members;
