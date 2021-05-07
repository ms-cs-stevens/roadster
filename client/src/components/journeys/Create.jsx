import React, { useState } from 'react';

// import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Journey from './Journey';
import journeyService from "../../services/apiService";
import { apiUrl } from "../../config";

const CreateJourney = () => {
  const [sourceCities, setSourceCities] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);
  const [redirectFlag, setRedirectFlag] = useState(false);
  const [journeyID, setJourneyID] = useState('');

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const classes = useStyles();

  const sourceDataSet = () => {
    setSourceCities([{ place: 'New York' }, { place: 'New Jersey' }]);
  };

  const destinationDataSet = () => {
    setDestinationCities([{ place: 'New York' }, { place: 'New Jersey' }]);
  };

  const SaveJourney = async (event) => {
    event.preventDefault();
    const {source, destination, occupancy} = event.target.elements;

    const journeyPayload = {
      source: source.value,
      destination: destination.value,
      occupancy: occupancy.value,
    };

    try {
      const journey = await journeyService.createResource(`${apiUrl}/createJourney`, journeyPayload)
      setJourneyID(journey._id);
      setRedirectFlag(true);
    } catch (e) {
      alert('Provide correct values');
    }
  };

  if (redirectFlag) {
    return (
      <Journey id={journeyID} />
    );
  }

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        method="POST"
        onSubmit={SaveJourney}
      >

        <Autocomplete
          id="source"
          options={sourceCities}
          getOptionLabel={(option) => option.place}
          style={{ width: 300 }}
          name="source"
          renderInput={(params) => <TextField required {...params} label="Source" variant="outlined" onChange={sourceDataSet}/>}
        />

        <Autocomplete
          id="destination"
          options={destinationCities}
          getOptionLabel={(option) => option.place}
          style={{ width: 300 }}
          name="destination"
          renderInput={(params) => <TextField required {...params} label="Destination" variant="outlined" onChange={destinationDataSet}/>}
        />

        <TextField
          required
          id="occupancy"
          name="occupancy"
          label="Occupancy"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateJourney;
