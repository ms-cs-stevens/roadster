import React, { useReducer, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Explore from '@material-ui/icons/Explore';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import RoomIcon from '@material-ui/icons/Room';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SearchLocationInput from '../SearchLocationInput';
import apiService from "../../services/apiService";
import { apiUrl } from "../../config";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }

function CreateJourney() {
  const history = useHistory();
  const classes = useStyles();
  const [formData, setFormData] = useReducer(formReducer, { editable: false });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Fix below condition for form submission and set form error
    if(!formData || !formData.origin || !formData.destination ||
      formData.budget.length === 0 || formData.occupancy.length === 0 ||
      formData.name.length === 0  )
      return;


    setSubmitting(true);

    try {
      const journey = await apiService.createResource(`${apiUrl}/journeys`, formData)
      history.push(`/journeys/${journey._id}`);
    } catch (e) {
      console.log(e);
      // TODO: set error on form
      alert('Provide correct values');
      setSubmitting(false);
    }


    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
  }

  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';

    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : (event.detail && event.detail.location) || event.target.value,
    });
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Explore />
        </Avatar>
        <Typography component="h1" variant="h5">
          Plan Your Journey
        </Typography>
        {submitting &&
          <div>
            You are submitting the following:
            <ul>
              {Object.entries(formData).map(([name, value]) => (
                <li key={name}><strong>{name}</strong>:{value.toString()}</li>
              ))}
            </ul>
          </div>
        }
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <SearchLocationInput
              name = "origin"
              label = "Origin"
              setLocation={handleChange}
              placeholder = "New York, NY"
              id = "origin"
              icon = {<TripOriginIcon color="action" fontSize="small" />}
            />
            <SearchLocationInput
              name = "destination"
              setLocation={handleChange}
              label = "Destination"
              placeholder = "Destination"
              icon = {<RoomIcon color="action" />}
              id = "destination"
            />
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="Members"
                name="occupancy"
                type="number"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                id="members"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                label="Group Members"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="budget"
                label="Tentative Budget"
                name="budget"
                autoComplete="budget"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="journey-name"
                label="Roadtrip name"
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="editable" color="primary" />}
                label="I want to allow other members of the journey to update it."
                name="editable"
                onChange={handleChange}
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
            Plan your Journey
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default CreateJourney;
