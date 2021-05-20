import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Button,
  TextField,
  Checkbox,
} from "@material-ui/core";
import React, {useState, useContext } from 'react';
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import apiService from "../../services/apiService";
import { AuthContext } from "../../firebase/Auth";

const useStyles = makeStyles((theme) => ({
  paper: {
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
}));

const EditJourneyDetails = ({ journey, updateJourneyDetails }) => {
  const classes = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { handleSubmit, control } = useForm();

  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const response = await apiService.editResource(`journeys/${journey._id}`, formData);
      console.log(response);
      updateJourneyDetails(response.journey);
    } catch (e) {
      setMessage(e.message);
    }
    setSubmitting(false);
  };

  const preventMembersToEdit = () => {
    if(!journey) return false;
    return (currentUser.uid === journey.creatorId);
  }

  if (journey) {
    return (
      <Card>
        <CardHeader
          title="Trip Details"
          subheader={<small><span>Updated </span><Moment fromNow>{journey.updatedAt}</Moment></small>}
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 300,
              position: "relative",
            }}
          >
            {message && (<Alert severity="info">{message}</Alert>)}
            <div className={classes.paper}>
              {submitting && (
                <Alert severity="info">Please wait while we update your Roadtrip!</Alert>
              )}
              <form className={classes.form} onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid item xs={10}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={journey.name}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          id="name"
                          label="Roadtrip name *"
                          variant="outlined"
                          value={value}
                          fullWidth
                          placeholder="Give your roadtrip a name"
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      )}
                      rules={{ required: 'Roadtrip name required' }}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} sm={5}>
                    <Controller
                      name="occupancy"
                      control={control}
                      defaultValue={journey.occupancy}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          label="Group Members *"
                          id="members"
                          variant="outlined"
                          value={value}
                          type="number"
                          fullWidth
                          placeholder="Members"
                          onChange={onChange}
                          error={!!error}
                          InputProps={{ inputProps: { min: 1 } }}
                          helperText={error ? error.message : "You need to have atleast 1 member"}
                        />
                      )}
                      rules={{ required: 'Group Members required',
                                min: {value: 1, message: "You need to have atleast 1 member"}}}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} sm={5}>
                    <Controller
                      name="budget"
                      control={control}
                      defaultValue={journey.budget}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          id="budget"
                          label="Tentative Budget *"
                          variant="outlined"
                          value={value}
                          type="number"
                          placeholder="USD"
                          fullWidth
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      )}
                      rules={{ required: 'Please provide tentative budget'}}
                      />
                  </Grid>
                  <br />
                  <Grid item xs={12} sm={12} md={10}>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue={journey.description}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          label="Description"
                          variant="outlined"
                          value={value}
                          fullWidth
                          multiline
                          rows={5}
                          placeholder="Add description about your roadtrip"
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      )}
                      />
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    {preventMembersToEdit() && (<label>
                      <Controller
                        name="editable"
                        control={control}
                        defaultValue={journey.editable}
                        render={({ field: props }) => (
                          <Checkbox
                            {...props}
                            checked={props.value}
                            onChange={(e) => props.onChange(e.target.checked)}
                          />
                        )}
                      />
                      I want to allow other members to update the Roadtrip *
                    </label>)}
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Save Details
                  </Button>
              </form>
            </div>
          </Box>
        </CardContent>
      </Card>
    );
  } else {
    return "Loading Trip Details !!";
  }
};

export default EditJourneyDetails;
