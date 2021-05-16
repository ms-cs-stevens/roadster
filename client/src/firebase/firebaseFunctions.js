import firebase from "firebase/app";
import apiService from "../services/apiService";
import { apiUrl } from "../config";

const createToken = async () => {
  const user = await firebase.auth().currentUser;
  const authToken = user && (await user.getIdToken());
  return authToken;
};

async function createUserWithEmailPass(email, password, firstName, lastName) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  let currentUser = await firebase.auth().currentUser;
  await currentUser.updateProfile({ displayName: `${firstName} ${lastName}` });
  await createToken();
  // create user on server, store on mongo
  await apiService.createResource(`${apiUrl}/users`, {
    email,
    firstName,
    lastName,
    uid: currentUser.uid,
  });
}

async function signout() {
  await firebase.auth().signOut();
  localStorage.removeItem("@token");
}

async function changePassword(email, oldPassword, newPassword) {
  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    oldPassword
  );
  await firebase.auth().currentUser.reauthenticateWithCredential(credential);
  await firebase.auth().currentUser.updatePassword(newPassword);
  await signout();
}

async function emailSignIn(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
  await createToken();
}

async function socialSignIn(provider) {
  let socialProvider = null;
  if (provider === "google") {
    socialProvider = new firebase.auth.GoogleAuthProvider();
  } else if (provider === "facebook") {
    socialProvider = new firebase.auth.FacebookAuthProvider();
  }
  const currentUser = await firebase.auth().signInWithPopup(socialProvider);
  await createToken();

  if (currentUser) {
    let userData;
    console.log(currentUser);
    const isNewUser = currentUser.additionalUserInfo.isNewUser;
    const userProfile = currentUser.additionalUserInfo.profile;
    if (isNewUser) {
      if (provider === "google") {
        userData = {
          firstName: userProfile.given_name,
          lastName: userProfile.family_name,
          email: userProfile.email,
          profileImage: userProfile.picture,
          uid: currentUser.user.uid,
        };
      } else if (provider === "facebook") {
        userData = {
          firstName: userProfile.first_name,
          lastName: userProfile.last_name,
          profileImage: userProfile.picture.data.url,
          email: userProfile.email,
          uid: currentUser.user.uid,
        };
      }

      await apiService.createResource(`${apiUrl}/users`, userData);
    }
  }
}

async function passwordReset(email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

async function passwordUpdate(password) {
  await firebase.auth().updatePassword(password);
}

export {
  createToken,
  createUserWithEmailPass,
  socialSignIn,
  emailSignIn,
  passwordReset,
  passwordUpdate,
  signout,
  changePassword,
};
