import React, {useContext} from "react";

import { AuthContext } from "../firebase/Auth";
import {Redirect} from 'react-router-dom'
//import CreateJourney from "./journeys/Create"

const Landing = () => {
  const { currentUser } = useContext(AuthContext);
  
  if(currentUser) {
    return(
      <Redirect to="/journeys/new"/>
    )
  }
  else{
    return(
      <Redirect to="/login"/>
    )
  }
};

export default Landing;
