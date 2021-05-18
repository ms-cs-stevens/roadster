import React, { useState, useEffect, useRef, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import RoomIcon from '@material-ui/icons/Room';
import InputAdornment from '@material-ui/core/InputAdornment';
import JourneyContext from '../contexts/JourneyContext';

let autoComplete;

async function handlePlaceSelect(updateQuery, autoCompleteRef) {
  const place = autoComplete.getPlace();

  if (!place || !place.geometry || !place.geometry.location) {
    // User entered the name of a Place that was not suggested and
    // pressed the Enter key, or the Place Details request failed.
    console.log("alert", "No details available for input: ");
    return;
  }

  const query = place.formatted_address;
  updateQuery(query);

  const locationDetails = {};
  let address1 = "";
  let postcode = "";

  for (const component of place.address_components) {
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number": {
        address1 = `${component.long_name} ${address1}`;
        break;
      }

      case "route": {
        address1 += component.short_name;
        break;
      }

      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        break;
      }

      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        break;
      }
      case "locality":
        locationDetails.locality = component.long_name;
        break;

      case "administrative_area_level_1": {
        locationDetails.state = component.short_name;
        break;
      }
      case "country":
        locationDetails.country = component.long_name;
        break;
      default:
    }
  }

  locationDetails.formattedAddress = query;
  locationDetails.address = address1;
  locationDetails.postcode = postcode;
  locationDetails.placeId = place.place_id;
  locationDetails.lat = place.geometry.location.lat();
  locationDetails.lng = place.geometry.location.lng();

  console.log("location", locationDetails);
  let event = new CustomEvent("setFormData", {
    detail: {
      location: locationDetails
    }
  });

  // Trigger custom hook when location is set
  autoCompleteRef.current.dispatchEvent(event);
}

function handleScriptLoad(updateQuery, autoCompleteRef) {
  if(!window.google) return;
  const options = {
    componentRestrictions: { country: ["us", "ca"] },
    fields: ["address_components", "geometry", "formatted_address", "place_id"],
    types: ["(cities)"], // type: ['geocode', 'address', 'establishment', '(regions)', '(cities)']
    // origin: map.getCenter(),
    // strictBounds: false,
  }

  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    options
  );
  autoComplete.addListener('place_changed', () => handlePlaceSelect(updateQuery, autoCompleteRef));
}

function CheckpointSearch({ name, label, placeholder, icon, id, setLocation }) {
  const [query, setQuery] = useState("");
  const journey = useContext(JourneyContext);
  const autoCompleteRef = useRef(null);

  icon = icon || <RoomIcon color="action" />;

  useEffect(() => {
    // TODO: FormData doesn't reset on deleting location from input field
    // TODO: Check issue with exceeding rate limit
    if(autoCompleteRef.current.value.length > 5)
      handleScriptLoad(setQuery, autoCompleteRef);
  }, [query]);


  useEffect(() => {
    // Custom hook to set location value in the form
    autoCompleteRef.current.addEventListener("setFormData", function(event) {
      setLocation(event);
    });
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <TextField
          inputRef={autoCompleteRef}
          variant="outlined"
          required
          fullWidth
          id={id}
          label={label}
          name={name}
          autoComplete={name}
          placeholder={placeholder}
          value={query}
          onChange={event => setQuery(event.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
          }}
        />
      </Grid>
    </>
  );
}

export default CheckpointSearch;
