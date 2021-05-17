import React, { useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";

const Map = (props) => {
  const [places, setPlaces] = useState([]);

  const journey = props.journey;

  useEffect(() => {
    let origin = journey.origin;
    let end = journey.destination;
    let checkpoints = journey.checkpoints;
    const allPlaces = [origin, ...checkpoints, end];
    console.log(allPlaces);
    const markers = [];
    allPlaces.forEach((place) => {
      console.log(place);
      markers.push({
        name: place.locality,
        location: {
          lat: place.lat,
          lng: place.lng,
        },
      });
    });
    setPlaces(markers);
  }, [journey]);
  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };
  const mapStyles = {
    height: "80vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: journey.origin.lat,
    lng: journey.origin.lng,
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={8}
          center={defaultCenter}
        />
      </LoadScript>

      <GoogleMap mapContainerStyle={mapStyles} zoom={6} center={defaultCenter}>
        {places.map((item) => {
          return (
            <Marker
              key={item.name}
              position={item.location}
              onClick={() => onSelect(item)}
            />
          );
        })}
        {selected.location && (
          <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <p>{selected.name}</p>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
