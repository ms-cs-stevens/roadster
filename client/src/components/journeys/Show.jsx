import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

const Journey = (props) => {
  const [source, SetSource] = useState('');
  const [destination, setDestination] = useState('');
  const [occupancy, setOccupancy] = useState(0);
  const [stopCities, setStopCities] = useState([]);
  let { id } = useParams();

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const classes = useStyles();

  const stopDataSet = () => {
    setStopCities([{ place: 'Jersey City' }, { place: 'Hoboken' }]);
  };

  const EditJourney = async (event) => {
    event.preventDefault();
    const stop = event.target.elements.stop.value;

    const journey = {
      id,
      stop,
    };

    try {
      const { data } = await axios.post('http://localhost:4000/editJourney', journey, {
        headers: { Accept: 'application/json' },
      });

      console.log(data);

      alert('Stop Added');
      // event.target.elements.stop.value = '';
    } catch (e) {
      alert('Provide correct values');
    }
  };

  useEffect(() => {
    async function fetchData() {
      console.log(`test111 ${id}`);
      try {
        const { data } = await axios.get(`http://localhost:4000/journey/${id}`);
        console.log(data);
        SetSource(data.origin);
        setDestination(data.destination);
        setOccupancy(data.occupancy);
      } catch (e) {
        console.log('Not Found');
      }
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        method="POST"
        onSubmit={EditJourney}
      >

        <TextField
          required
          value={source}
          id="source"
          name="source"
          label="Source"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />

        <br />
        <br />
        <TextField
          required
          value={destination}
          id="destination"
          name="destination"
          label="Destination"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />

        <br />
        <br />

        <TextField
          required
          value={occupancy}
          id="occupancy"
          name="occupancy"
          label="Occupancy"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        <br />
        <br />

        <Autocomplete
          id="stop"
          options={stopCities}
          getOptionLabel={(option) => option.place}
          style={{ width: 300 }}
          name="stop"
          renderInput={
            (params) => {
              console.log(params);
                <TextField required label="Stop" variant="outlined" onChange={stopDataSet} />;
            }
          }
          // renderInput={(params) => <TextField required {...params}
          // label="Stop" variant="outlined" onChange={stopDataSet} />}
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Add Stop
        </Button>
      </form>
    </div>
  );
};

export default Journey;
