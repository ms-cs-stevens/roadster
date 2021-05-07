import React from 'react';
import { Button } from '@material-ui/core';
import { signout } from '../../firebase/firebaseFunctions';

const Signout = () => {
  return (
    <Button onClick={signout} color="inherit">
      Sign out
    </Button>
  );
};

export default Signout;
