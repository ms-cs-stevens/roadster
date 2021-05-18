import { Helmet } from "react-helmet";
import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../firebase/Auth";
import { emailSignIn, passwordReset } from "../../firebase/firebaseFunctions";
import SocialSignIn from "./SocialSignIn";
import banner from "../../images/sign-in-page.jpg";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
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
  warningStyles: {
    "& .MuiFormLabel-root.Mui-error": {
      color: "#e72400 !important",
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderBottomColor: "#e72400 !important",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#e72400 !important",
    },
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [additionalError, setAdditionalError] = useState("");
  const { handleSubmit, control } = useForm();

  const { currentUser } = useContext(AuthContext);
  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      await emailSignIn(email, password);
    } catch (additionalError) {
      if (
        [
          "auth/wrong-password",
          "auth/invalid-email",
          "auth/user-not-found",
        ].includes(additionalError.code)
      ) {
        setAdditionalError("Invalid email or password");
      } else {
        setAdditionalError(additionalError.message);
      }
    }
  };

  const handlePasswordReset = (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    if (email) {
      passwordReset(email);
      alert("Password reset email was sent");
    } else {
      setAdditionalError(
        "Please enter an email address below before you click the forgot password link"
      );
    }
  };
  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Helmet>
        <title>Roadster | Login</title>
      </Helmet>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to Roadster
          </Typography>
          <Typography component="h2" style={{ color: "#333" }} variant="h6">
            What&apos;s your email and password?
          </Typography>
          <Typography
            variant="caption"
            style={{ color: "#ee0000" }}
            color="secondary"
          >
            {additionalError}
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(handleLogin)}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Email"
                      id="email"
                      className={error ? classes.warningStyles : null}
                      variant="outlined"
                      value={value}
                      fullWidth
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: "Email is required" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Password"
                      variant="outlined"
                      value={value}
                      className={error ? classes.warningStyles : null}
                      fullWidth
                      type="password"
                      id="password"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: "Password is required" }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={handlePasswordReset}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
          <br />
          OR
          <br />
          <br />
          <SocialSignIn />
        </div>
      </Grid>
    </Grid>
  );
}
