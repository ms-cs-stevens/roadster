import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import RoomIcon from '@material-ui/icons/Room';
import InputAdornment from '@material-ui/core/InputAdornment';

let autoComplete;

async function handlePlaceSelect(updateQuery) {
  const place = autoComplete.getPlace();

  if (!place || !place.geometry || !place.geometry.location) {
    // User entered the name of a Place that was not suggested and
    // pressed the Enter key, or the Place Details request failed.
    console.log("alert", "No details available for input: ");
    return;
  }

  const query = place.formatted_address;
  updateQuery(query);
}

function handleScriptLoad(updateQuery, autoCompleteRef) {
  if(!window.google) return;
  const options = {
    componentRestrictions: { country: ["us", "ca"] },
    fields: ["address_components", "geometry", "formatted_address"],
    types: ["(cities)"], // type: ['geocode', 'address', 'establishment', '(regions)', '(cities)']
    // origin: map.getCenter(),
    // strictBounds: false,
  }

  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    options
  );
  autoCompleteRef.current.focus();
  autoComplete.addListener('place_changed', () => handlePlaceSelect(updateQuery));
}

function SearchLocationInput({ name, label, placeholder, icon, id, setLocation }) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  icon = icon || <RoomIcon color="action" />;

  useEffect(() => {
    if(autoCompleteRef.current.value.length > 3)
      handleScriptLoad(setQuery, autoCompleteRef);
  }, [query]);

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
