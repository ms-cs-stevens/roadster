import firebase from "firebase/app";
import apiService from "../services/apiService";

const createToken = async () => {
  const user = await firebase.auth().currentUser;
  const authToken = user && (await user.getIdToken());
  return authToken;
};

async function updateUserName(id, data) {
  let currentUser = await firebase.auth().currentUser;
  await currentUser.updateProfile({
    displayName: `${data.firstName} ${data.lastName}`,
  });
  let updatedUser = await apiService.editResource(`users/${id}/update`, {
    firstName: data.firstName,
    lastName: data.lastName,
    profileImage: data.profileImage,
  });
  return updatedUser;
}

async function createUserWithEmailPass(email, password, firstName, lastName) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  let currentUser = await firebase.auth().currentUser;
  await currentUser.updateProfile({ displayName: `${firstName} ${lastName}` });
  // create user on server, store on mongo
  try {
    await apiService.createResource("users", {
      email,
      firstName,
      lastName,
      uid: currentUser.uid,
    });
  } catch (e) {
    console.log(e);
  }
}

async function signout() {
  await firebase.auth().signOut();
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
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    throw e;
  }
}

async function socialSignIn(provider) {
  let socialProvider = null;
  if (provider === "google") {
    socialProvider = new firebase.auth.GoogleAuthProvider();
  } else if (provider === "facebook") {
    socialProvider = new firebase.auth.FacebookAuthProvider();
  }
  const currentUser = await firebase.auth().signInWithPopup(socialProvider);

  if (currentUser) {
    let userData;
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
      try {
        await apiService.createResource("users", userData);
      } catch (e) {
        console.log(e);
      }
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
  updateUserName,
};
