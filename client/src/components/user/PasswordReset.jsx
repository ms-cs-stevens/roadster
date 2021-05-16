import React, { useContext, useState } from "react";
import { AuthContext } from "../../firebase/Auth";
import { changePassword } from "../../firebase/firebaseFunctions";
import {
  Button,
  TextField,
  Container,
  CssBaseline,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import "../../css/App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function PasswordReset() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");

  const submitForm = async (values) => {
    const { currentPassword, newPasswordOne, newPasswordTwo } = values;

    if (newPasswordOne !== newPasswordTwo) {
      setPwMatch("New passwords do not match, please try again");
      return false;
    }

    try {
      await changePassword(currentUser.email, currentPassword, newPasswordOne);
      alert("Password has been changed, you will now be logged out");
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser.providerData[0].providerId === "password") {
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div>
          {pwMatch && <h4 className="error">{pwMatch}</h4>}
          <h1>Change password</h1>
          <form onSubmit={submitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="newPass"
                  label="New Password"
                  type="password"
                  id="newPass"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Password Confirmation"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="passwordConfirmation"
                />
              </Grid>
            </Grid>
            <br />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Change Password
            </Button>
          </form>
        </div>
      </Container>
    );
  } else {
    return (
      <div>
        <h1>Change password</h1>
        <span className="sub-info">
          You are signed in using a Social Media Provider, you cannot change
          your password.
        </span>
      </div>
    );
  }
}

export default PasswordReset;
