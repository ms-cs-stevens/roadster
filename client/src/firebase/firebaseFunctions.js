import firebase from "firebase/app";

async function createUserWithEmailPass(email, password, displayName) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  firebase.auth().currentUser.updateProfile({ displayName: displayName });
}

async function changePassword(email, oldPassword, newPassword) {
  let credential = firebase.auth.EmailAuthProvider.credential(
    email,
    oldPassword
  );
  await firebase.auth().currentUser.reauthenticateWithCredential(credential);
  await firebase.auth().currentUser.updatePassword(newPassword);
  await signout();
}

async function emailSignIn(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function socialSignIn(provider) {
  let socialProvider = null;
  if (provider === "google") {
    socialProvider = new firebase.auth.GoogleAuthProvider();
  } else if (provider === "facebook") {
    socialProvider = new firebase.auth.FacebookAuthProvider();
  }
  await firebase.auth().signInWithPopup(socialProvider);
}

async function passwordReset(email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

async function passwordUpdate(password) {
  await firebase.auth().updatePassword(password);
}

async function signout() {
  await firebase.auth().signOut();
}

export {
  createUserWithEmailPass,
  socialSignIn,
  emailSignIn,
  passwordReset,
  passwordUpdate,
  signout,
  changePassword,
};
