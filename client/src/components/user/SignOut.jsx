import React, { useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { signout } from '../../firebase/firebaseFunctions';
import { AuthContext } from '../../firebase/Auth';

const Signout = () => {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <Button onClick={signout} color="inherit">
      Sign out
    </Button>
  );
};

export default Signout;
