import React, {useContext} from "react";

import { AuthContext } from "../firebase/Auth";
import CreateJourney from "./journeys/Create";
import Login from "./users/Login";

const Landing = () => {
  const { currentUser } = useContext(AuthContext);
  if(currentUser) return  <CreateJourney />
  else  return  <Login /> 
};

export default Landing;
