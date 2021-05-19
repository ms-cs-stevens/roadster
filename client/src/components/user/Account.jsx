import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { AuthContext } from "../../firebase/Auth";
import apiService from "../../services/apiService";
import { NavLink } from "react-router-dom";
import { updateUserName } from "../../firebase/firebaseFunctions";
import { useForm, Controller } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { openUploadWidget } from "../../services/CloudinaryService";

import {
  Avatar,
  Button,
  TextField,
  Container,
  CssBaseline,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

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
  avatar: {
    backgroundColor: deepPurple[800],
    fontSize: "3em",
    width: theme.spacing(15),
    height: theme.spacing(15),
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

function Account() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [socialUser, setSocialUser] = useState(false);
  const { handleSubmit, control } = useForm();
  const [images, setImages] = useState("");

  const beginUpload = (tag) => {
    const uploadOptions = {
      multiple: false,
      cloudName: "dhpq62sqc",
      tags: [tag],
      uploadPreset: "juawc70d",
      cropping: true,
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log("photos=" + photos);
        if (photos.event === "success") {
          setImages(
            `https://res.cloudinary.com/dhpq62sqc/image/upload/v1621366240/${photos.info.public_id}`
          );
        }
      } else {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    async function fetchUser() {
      if (currentUser) {
        const user = await apiService.getResource(`users/${currentUser.uid}`);
        setSocialUser(currentUser.providerData[0].providerId !== "password");
        setUser(user);
        setImages(user.profileImage);
      }
    }
    fetchUser();
  }, [currentUser]);

  const onSubmit = async (data) => {
    if (socialUser) {
      return false;
    }
    if (
      data.firstName !== user.firstName ||
      data.lastName !== user.lastName ||
      images !== user.profileImage
    ) {
      data.profileImage = images;
      console.log(data);
      try {
        let updatedUser = await updateUserName(user._id, data);
        console.log(updatedUser);
        setUser(updatedUser);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const userDetails = () => {
    if (socialUser) {
      return (
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <TextField
              id="firstName"
              label="First Name"
              name="firstName"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              defaultValue={user.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="lastName"
              label="Last Name"
              name="lastName"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              defaultValue={user.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              defaultValue={user.email}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue={user.firstName}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="First Name"
                    id="firstName"
                    variant="outlined"
                    value={value}
                    className={error ? classes.warningStyles : null}
                    fullWidth
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "First name required" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue={user.lastName}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Last Name"
                    id="lastName"
                    variant="outlined"
                    value={value}
                    className={error ? classes.warningStyles : null}
                    fullWidth
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "Last name required" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                helperText={"Email is not editable."}
                fullWidth
                id="email"
                InputProps={{
                  readOnly: true,
                }}
                label="Email"
                name="email"
                defaultValue={user.email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update profile
              </Button>
            </Grid>
          </Grid>
        </form>
      );
    }
  };

  if (user) {
    return (
      <Container component="main" maxWidth="sm">
        <Helmet>
          <title>Roadster | My Account</title>
        </Helmet>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            alt={user.firstName}
            src={user.profileImage}
            className={classes.avatar}
          >
            {user.firstName[0] + user.lastName[0]}
          </Avatar>
          {!socialUser && (
            <IconButton
              onClick={() => beginUpload()}
              color="primary"
              aria-label="upload profile picture picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          )}
          <br />
          <Typography component="h1" variant="h5">
            {user ? user.firstName + " " + user.lastName : ""}'s Profile
          </Typography>
          <br />
          {userDetails()}
          {!socialUser && (
            <Button className="btn-right-margin">
              <NavLink
                exact
                to="/user/change-password"
                activeClassName="active"
              >
                Change password
              </NavLink>
            </Button>
          )}
          <br />
        </div>
      </Container>
    );
  } else {
    return "Loading";
  }
}

export default Account;
