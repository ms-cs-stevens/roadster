import React, { useEffect } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useState } from "react";

const Map = (props) => {
  const journey = props.journey;
  const [directions, setDirection] = useState();
  useEffect(() => {
    let origin = journey.origin;
    let end = journey.destination;
    let checkpoints = [
      {
        location: "Rockleigh, New Jersey 07647",
        stopover: true,
      },
      {
        location: "West new york",
        stopover: true,
      },
      {
        location: "Hoboken",
        stopover: true,
      },
      {
        location: "Newark",
        stopover: true,
      },
    ];

    function computeTotalDistance(result) {
      var totalDist = 0;
      var totalTime = 0;
      var myroute = result.routes[0];
      for (var i = 0; i < myroute.legs.length; i++) {
        totalDist += myroute.legs[i].distance.value;
        totalTime += myroute.legs[i].duration.value;
      }
      props.setDistanceTime({
        totalDist: Math.round(totalDist / 1609.34) + " miles",
        totalTime: Math.round(totalTime / 3600) + " hrs",
      });
    }

    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: origin,
        destination: end,
        waypoints: checkpoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirection(result);
          computeTotalDistance(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [props, journey]);

  const mapStyles = {
    height: "90vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: journey.origin.lat,
    lng: journey.origin.lng,
  };

  return (
    <div>
      <GoogleMap mapContainerStyle={mapStyles} zoom={6} center={defaultCenter}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
