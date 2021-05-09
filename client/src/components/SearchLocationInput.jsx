import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import RoomIcon from '@material-ui/icons/Room';
import InputAdornment from '@material-ui/core/InputAdornment';

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

  const location2 = {};
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
        location2.locality = component.long_name;
        break;

      case "administrative_area_level_1": {
        location2.state = component.short_name;
        break;
      }
      case "country":
        location2.country = component.long_name;
        break;
      default:
    }
  }

  location2.address = address1;
  location2.postcode = postcode;
  location2.place_id = place.place_id
  location2.geometry = place.geometry.location;

  let event = new CustomEvent("hello", {
    detail: {
      location: location2
    }
  });

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
  autoCompleteRef.current.focus();
  autoComplete.addListener('place_changed', () => handlePlaceSelect(updateQuery, autoCompleteRef));
}

function SearchLocationInput({ name, label, placeholder, icon, id, setLocation }) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  icon = icon || <RoomIcon color="action" />;

  useEffect(() => {
    if(autoCompleteRef.current.value.length > 5)
      handleScriptLoad(setQuery, autoCompleteRef);
  }, [query]);


  useEffect(() => {
    autoCompleteRef.current.addEventListener("hello", function(event) {
      console.log("Details", event.detail);
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

export default SearchLocationInput;
