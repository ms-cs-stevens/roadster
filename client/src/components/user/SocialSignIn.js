import React from "react";
import { socialSignIn } from "../../firebase/firebaseFunctions";

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
        onClick={() => socialSignOn("google")}
        alt="google signin"
        src="/images/btn_google_signin.png"
      />
      <img
        onClick={() => socialSignOn("facebook")}
        alt="facebook signin"
        src="/images/facebook_signin.png"
      />
    </div>
  );
};

export default SocialSignIn;
