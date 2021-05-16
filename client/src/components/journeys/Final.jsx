import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Map from './Map';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import "../../css/App.css";

const Final = (props) => {

  let { id } = useParams();
  const [source, SetSource] = useState({});
  const [destination, setDestination] = useState({});
  const [occupancy, setOccupancy] = useState(0);
  const [budget, setBudget] = useState(0);
  const [stopCities, setStopCities] = useState([]);
  const [places,setPlaces] = useState([]);

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const classes = useStyles();



  useEffect(() => {
    async function fetchData() {
      const allMarkers=[];
      try {
        const { data } = await axios.get(`http://localhost:4000/journey/${id}`);
        SetSource(data.origin);
        setDestination(data.destination);
        setOccupancy(data.occupancy);
        setBudget(data.budget);
        setStopCities(data.checkpoints);
        
        allMarkers.push({
        name: data.origin.locality,
        location: { 
        lat: data.origin.lat,
        lng: data.origin.lng
        }});
        allMarkers.push({
          name: data.destination.locality,
          location: { 
          lat: data.destination.lat,
          lng: data.destination.lng
          }});
        setPlaces(allMarkers);

      } catch (e) {
        console.log('Not Found');
      }
    }
    fetchData();
  }, [id]);



  const pdfGenerate=()=>{
    

    html2canvas(document.getElementById("journey"),{ proxy: "server.js",
    useCORS: true,}).then(function(canvas) 
    {     
          let doc;
          var imgData = canvas.toDataURL('image/jpeg');
          var w = document.getElementById("journey").offsetWidth;
          var h = document.getElementById("journey").offsetHeight;
          doc = new jsPDF('l', 'mm', [canvas.height, canvas.width]);
          doc.addImage(imgData, 'JPEG', 0,0,w,h);
          doc.save('Journey_'+id+'.pdf');
          //doc.save('Journey.pdf');
      })  
      
  }

  return (
    <div>
    <Button data-html2canvas-ignore="true" onClick={pdfGenerate} variant="contained" color="primary">Download Trip Details</Button>
   
    <div id="journey" className="journey">
    <h1>Trip Details</h1>
     <dl>


<dt className="title">Origin : </dt>
<dd>{source.locality} {source.state}, {source.country}</dd>  

<dt className="title">Stops :</dt>
								{stopCities.length >= 1 ? (
									<div>
										{stopCities.map((obj) => {
											let dd=<dd key={obj.place_id}>{obj.locality} {obj.state}, {obj.country}</dd>;
                          return dd;
										})}
									</div>
								 ) : (
									<dd>No Stops</dd>
		)}

<dt className="title">Destination : </dt>
<dd>{destination.locality} {destination.state}, {destination.country}</dd>

<dt className="title">Occupancy : </dt>
<dd>{occupancy}</dd>

<dt className="title">Budget : </dt>
<dd>{budget}</dd>
      
</dl>

<Map markers={places}/>
    </div>
    </div>
  );
};

export default Final;
