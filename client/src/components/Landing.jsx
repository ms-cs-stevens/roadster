import React, { useContext } from "react";

import { AuthContext } from "../firebase/Auth";
import CreateJourney from "./journeys/Create";
import Login from "./user/SignIn";

const Landing = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) return <CreateJourney showWelcomeMessage={true} />;
  else return <Login showWelcomeMessage={true} />;
};

export default Landing;
