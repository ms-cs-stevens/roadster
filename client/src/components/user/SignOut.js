import React from "react";
import { signout } from "../../firebase/firebaseFunctions";
import { Button } from "@material-ui/core";

const Signout = () => {
  return <Button onClick={signout}>Sign out</Button>;
};

export default Signout;
