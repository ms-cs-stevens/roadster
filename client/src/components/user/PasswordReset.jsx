import React, { useContext, useState } from "react";
import { AuthContext } from "../../firebase/Auth";
import { changePassword } from "../../firebase/firebaseFunctions";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Container,
  CssBaseline,
  Typography,
  Avatar,
  Grid,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
  const { handleSubmit, control } = useForm();
  const [passwordError, setPasswordError] = useState("");

  const submitForm = async (values) => {
    const { password, newPass, passwordConfirmation } = values;
    if (newPass !== passwordConfirmation) {
      setPasswordError("New passwords do not match, please try again");
      return false;
    }

    try {
      await changePassword(currentUser.email, password, newPass);
      alert("Password has been changed, you will now be logged out");
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser.providerData[0].providerId === "password") {
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Typography component="body">{passwordError}</Typography>
          <br />
          <br />
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Current Password"
                      variant="outlined"
                      value={value}
                      fullWidth
                      type="password"
                      id="newPass"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: "Current password is required" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="newPass"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="New Password"
                      variant="outlined"
                      value={value}
                      fullWidth
                      type="password"
                      id="newPass"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: "New password is required" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="passwordConfirmation"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Password Confirmation"
                      variant="outlined"
                      value={value}
                      fullWidth
                      type="password"
                      id="passwordConfirmation"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: "New password confirmation is required" }}
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
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {passwordError && <h4 className="error">{passwordError}</h4>}
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <br />
          <br />
          <Typography component="body1">
            You are signed in using a Social Media Provider.
            <br />
            You cannot change your password.
          </Typography>
        </div>
      </Container>
    );
  }
}

export default PasswordReset;
