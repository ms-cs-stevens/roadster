import { Helmet } from "react-helmet";
import React, { useReducer, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Explore from "@material-ui/icons/Explore";
import TripOriginIcon from "@material-ui/icons/TripOrigin";
import RoomIcon from "@material-ui/icons/Room";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SearchLocationInput from "../SearchLocationInput";
import apiService from "../../services/apiService";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Map from "./Map";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
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

const journeyReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function CreateJourney({ showWelcomeMessage }) {
  const history = useHistory();
  const classes = useStyles();
  const [journey, setJourney] = useReducer(journeyReducer, { checkpoints: [] });
  const [submitting, setSubmitting] = useState(false);
  const { handleSubmit, control } = useForm();

  const setDistanceTime = (data) => {
    console.log(data);
  };

  const handleFormSubmit = async (data) => {
    // TODO: Fix below condition for form submission and set form error
    if (!journey || !journey.origin || !journey.destination) return;

    setSubmitting(true);
    const formData = { ...journey, ...data };

    try {
      const journey = await apiService.createResource("journeys", formData);
      history.push(`/journeys/${journey._id}`);
    } catch (e) {
      console.log(e);
      // TODO: set error on form
      alert("Provide correct values");
    }
    setSubmitting(false);
  };

  const handleChange = (event) => {
    setJourney({
      name: event.target.name,
      value: (event.detail && event.detail.location) || event.target.value,
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Helmet>
        <title>Roadster | Plan Your Journey</title>
      </Helmet>
      <CssBaseline />
      <Grid container spacing={4}>
        <Grid item md={7} xs={12}>
          <Map journey={journey} setDistanceTime={setDistanceTime} />
        </Grid>
        <Grid item md={5} xs={12}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Explore />
            </Avatar>
            {showWelcomeMessage ? (
              <>
                <Typography component="h1" variant="h5">
                  Welcome to Roadster
                </Typography>
                <Typography
                  component="h2"
                  style={{ color: "#333" }}
                  variant="h6"
                >
                  Turn your road trip into an adventure!
                </Typography>
              </>
            ) : (
              <Typography component="h1" variant="h5">
                Plan Your Journey
              </Typography>
            )}

            {submitting && (
              <div>Please wait while we create your Roadtrip!</div>
            )}
            <form
              className={classes.form}
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <SearchLocationInput
                    name="origin"
                    label="Origin"
                    setLocation={handleChange}
                    placeholder="New York, NY"
                    id="origin"
                    icon={<TripOriginIcon color="action" fontSize="small" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SearchLocationInput
                    name="destination"
                    setLocation={handleChange}
                    label="Destination"
                    placeholder="Destination"
                    icon={<RoomIcon color="action" />}
                    id="destination"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="occupancy"
                    control={control}
                    defaultValue={1}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Group Members"
                        variant="outlined"
                        id="members"
                        value={value}
                        type="number"
                        fullWidth
                        onChange={onChange}
                        className={error ? classes.warningStyles : null}
                        error={!!error}
                        InputProps={{ inputProps: { min: 1 } }}
                        helperText={error ? error.message : null}
                      />
                    )}
                    rules={{
                      required: 'Group Members required',
                      min: {value: 1, message: "Min 1 Group Members required"}
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="budget"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Tentative Budget"
                        variant="outlined"
                        placeholder="Give your roadtrip a name"
                        value={value}
                        id="budget"
                        className={error ? classes.warningStyles : null}
                        type="number"
                        fullWidth
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                    rules={{ required: "Budget required" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Roadtrip name"
                        id="name"
                        variant="outlined"
                        value={value}
                        className={error ? classes.warningStyles : null}
                        fullWidth
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                    rules={{ required: "Roadtrip name required" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <section id="input-checkbox">
                    <label>
                      <Controller
                        name="editable"
                        control={control}
                        defaultValue={false}
                        render={({ field: props }) => (
                          <Checkbox
                            {...props}
                            onChange={(e) => props.onChange(e.target.checked)}
                          />
                        )}
                      />
                      I want to allow other members to update the Roadtrip
                      </label>
                    </section>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Plan your Journey
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateJourney;
