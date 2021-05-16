import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/Auth";
import PasswordReset from "./PasswordReset";
import apiService from "../../services/apiService";
import { apiUrl } from "../../config";
import { useForm } from "react-hook-form";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  Avatar,
  Button,
  TextField,
  Container,
  Paper,
  CssBaseline,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  // paper: {
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

function Account() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.preventDefault();
    console.log(data);
  };

  useEffect(() => {
    async function fetchUser() {
      if (currentUser) {
        const user = await apiService.getResource(
          `${apiUrl}/users/${currentUser.uid}`
        );
        console.log(user);
        setUser(user);
      }
    }
    fetchUser();
  }, [currentUser]);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          alt={user && user.firstName}
          src={user && user.profileImage}
          className={classes.large}
        />
        <br />
        <Typography component="h1" variant="h5">
          {user ? user.firstName + " " + user.lastName : ""}'s Profile
        </Typography>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                InputProps={{ ...register("firstName", { required: true }) }}
                error={!!errors.firstName}
                helperText={errors.firstName && "First name is required."}
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputProps={{ ...register("lastName", { required: true }) }}
                error={!!errors.lastName}
                helperText={errors.lastName && "Last name is required."}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{ disabled: true }}
                helperText={"Email is not editable."}
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                value={(user && user.email) || ""}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={10}>
              <PasswordReset />
            </Grid>
          </Grid>
          <br />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Update profile
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Account;

{
  /* <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={8} component={Paper} elevation={6}>
          <h1>{user ? user.firstName + " " + user.lastName : ""}'s Profile</h1>
          <Avatar
            alt={user && user.firstName}
            src={user && user.profileImage}
            className={classes.large}
          />
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  InputProps={{ ...register("firstName", { required: true }) }}
                  error={!!errors.firstName}
                  helperText={errors.firstName && "First name is required."}
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  InputProps={{ ...register("lastName", { required: true }) }}
                  error={!!errors.lastName}
                  helperText={errors.lastName && "Last name is required."}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{ disabled: true }}
                  helperText={"Email is not editable."}
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={(user && user.email) || ""}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={10}>
                <PasswordReset />
              </Grid>
            </Grid>
            <br />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Update profile
            </Button>
          </form>
        </Grid>
      </Grid>
    </div> */
}
