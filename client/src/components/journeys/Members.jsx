import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  Avatar,
  TextField,
  Grid,
  Button,
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

const Members = ({ journeyId, showSearch }) => {
  const [members, setMembers] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(undefined);
  const [journey, setJourney] = useState(undefined);

  const showAddButton = (memberId) =>
    showSearch && journey && !journey.users.includes(memberId);

  useEffect(() => {
    async function fetchData() {
      const data = await apiService.getResource(
        `journeys/${journeyId}/members`
      );
      console.log("useEffect", data);
      setMembers(data.members);
      setJourney(data.journey);
      setLoading(false);
    }
    fetchData();
  }, [journeyId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await apiService.getResource(
          `users?searchTerm=${searchTerm}`
        );
        setSearchData(data.users);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    if (searchTerm) {
      setTimeout(() => {
        fetchData();
      }, 200);
    } else {
      setSearchData(undefined);
    }
  }, [searchTerm]);

  const addToTrip = async (e, member) => {
    try {
      const data = await apiService.createResource(
        `journeys/${journeyId}/members`,
        { users: [...journey.users, member._id] }
      );

      console.log("add", data);
      setJourney(data.journey);
      setMembers(data.members);
      setSearchData(undefined);
      setSearchTerm("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
  };

  const renderUsers = () => {
    let users;
    if (searchData && searchData.length) {
      users = searchData;
    } else {
      users = members;
    }

    console.log(users);

    if (users && users.length) {
      return users.map((member, i) => (
        <ListItem divider={i < users.length - 1} key={member._id}>
          <ListItemAvatar>
            <Avatar
              alt={member.firstName}
              src={member.profileImage}
              className={classes.avatar}
            >
              {member.firstName[0] + member.lastName[0]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={member.firstName + " " + member.lastName} />
          {showAddButton(member._id) && (
            <Button onClick={(e) => addToTrip(e, member)}>Add</Button>
          )}
        </ListItem>
      ));
    } else {
      return (
        <ListItem>{showSearch ? "No users found" : "No members yet"}</ListItem>
      );
    }
  };

  if (loading) {
    return "Loading";
  } else {
    return (
      <Card>
        <CardHeader
          subtitle={`${members && members.length} in total`}
          title="Members"
          action={
            showSearch && (
              <>
                <TextField
                  id="outlined-basic"
                  autoComplete="off"
                  type="search"
                  placeholder="Search and add users"
                  size="small"
                  label="Search"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <br />
              </>
            )
          }
        />
        <Divider />
        <br />
        <List>{renderUsers()}</List>
        <Divider />
      </Card>
    );
  }
};

export default Members;
