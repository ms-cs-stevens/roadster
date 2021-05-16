import React from 'react';
import { socialSignIn } from '../../firebase/firebaseFunctions';

const SocialSignIn = () => {
  const socialSignOn = async (provider) => {
    try {
      await socialSignIn(provider);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <img
        onClick={() => socialSignOn('google')}
        alt="google signin"
        src="/images/googlesignin.png"
        width="214px"
        aria-hidden="true"
      />
      <img
        onClick={() => socialSignOn('facebook')}
        alt="facebook signin"
        src="/images/facebook_signin.png"
        width="202px"
        aria-hidden="true"
      />
    </div>
  );
};

export default SocialSignIn;
