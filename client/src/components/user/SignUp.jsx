import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../firebase/Auth';
import { createUserWithEmailPass } from '../../firebase/firebaseFunctions';
import SocialSignIn from './SocialSignIn';
import banner from '../../images/sign-up-page.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${banner})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z-]+(?:\.[a-zA-Z-]+)*$/;

  const firstNameError = (error === 'First name is required!') && 'First name is required!';
  const lastNameError = (error === 'Last name is required!') && 'Last name is required!';
  const emailError = (error === 'Email is Invalid!') && 'Email is Invalid!';
  const passError = (error === 'Passwords did not match!') && 'Passwords did not match!';

  const { currentUser } = useContext(AuthContext);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      } = event.target.elements;

      if(!firstName.value.trim()) {
        throw new Error("First name is required!");
      }
      if(!lastName.value.trim()) {
        throw new Error("Last name is required!");
      }
      if (!emailRegex.test(email.value)) {
        throw new Error("Email is Invalid!");
      }
      if (password.value !== passwordConfirmation.value) {
        throw new Error("Passwords did not match!");
      }

      await createUserWithEmailPass(
        email.value,
        password.value,
        firstName.value,
        lastName.value,
      );
    } catch (error) {
      setError(error);
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>

          <form className={classes.form} onSubmit={handleSignUp}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  error={lastNameError}
                  helperText={lastNameError}
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  error={firstNameError}
                  helperText={firstNameError}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  error={emailError}
                  helperText={emailError}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  helperText={passError}
                  error={passError}
                  id="password"
                  autoComplete="current-password"
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
                  helperText={passError}
                  error={passError}
                  id="passwordConfirmation"
                  autoComplete="passwordConfirmation"
                />
              </Grid>
            </Grid>
            <br />
            <SocialSignIn />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
