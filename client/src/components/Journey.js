import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button,TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';


const Journey = (props) => {
    const [source,SetSource]=useState('');
    const [destination,setDestination]=useState('');
    const [occupancy,setOccupancy]=useState(0);
    const [ stopCities, setStopCities ] = useState([]);

    const useStyles = makeStyles((theme) => ({
		root: {
		  '& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		  },
		},
	  }));

	const classes = useStyles();

    const stopDataSet = (e) => {
		setStopCities([{place:"New York"},{place:"New Jersey"}]);
	};

    const EditJourney = async (event) => {
		event.preventDefault();
		let id = props.id;
		let stop = event.target.elements.stop.value;
	
		let journey = {
			id,
			stop,
		}; 
	
		try{
		const { data } = await axios.post('http://localhost:4000/editJourney', journey, {
		  headers: { Accept: 'application/json' }
		});

		alert("Stop Added");
        event.target.elements.stop.value="";
	    }
		catch(e){
		alert("Provide correct values");
		}
	};

    useEffect(() => {
		async function fetchData() {
            console.log("test111 "+ props.id);
			try{
                const { data } = await axios.get('http://localhost:4000/journey/'+props.id);
                alert(JSON.stringify(data));
                console.log(data);
                SetSource(data.source);
                setDestination(data.destination);
                setOccupancy(data.occupancy);

            }
            catch(e){
                console.log("Not Found")
            }
		}
		fetchData();
	}, [props.id]);


    return (
		<div>
		<form className={classes.root} noValidate autoComplete="off"
			method='POST' onSubmit={EditJourney}>

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

        <br></br>
		<br></br>
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

        <br></br>
		<br></br>

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
		<br></br>
		<br></br>

        <Autocomplete
			id="stop"
			options={stopCities}
			getOptionLabel={(option) => option.place}
			style={{ width: 300 }}
			name="stop"
			renderInput={(params) => <TextField required {...params} label="Stop" variant="outlined" onChange={stopDataSet}/>}
			/>
        <br></br>
		<Button  type="submit" variant="contained" color="primary">
  		Add Stop
		</Button>
		</form>
        </div>
	);
};

export default Journey;