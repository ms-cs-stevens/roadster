import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import {useState } from 'react';

const Map = (props) => {

  const [ selected, setSelected ] = useState({});
  
  const onSelect = item => {
    setSelected(item);
  }
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 39, lng: -95
  }


  return (
    <div>
    <LoadScript
       googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={defaultCenter}
        />
     </LoadScript>

<GoogleMap
mapContainerStyle={mapStyles}
zoom={3}
center={defaultCenter}>
{
  props.markers.map(item => {
    return (
    <Marker key={item.name} 
      position={item.location}
      onClick={() => onSelect(item)}/>
    )
  })
}
{
 selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name}</p>
 </InfoWindow>
            )
         }
</GoogleMap>

</div>

  );
};

export default Map;
