const { User } = require("../models");

userObject = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    uid: user.uid,
    phone: user.phone,
    gender: user.gender,
  };
};

validateUserInfo = (user) => {
  if (!user) throw "Provide user details";
  if (!user.firstName) throw "Provide firstname";
  if (!user.lastName) throw "Provide lastname";
  if (!user.email) throw "Provide email";
};

async function createUser(userInfo) {
  validateUserInfo(userInfo);
  let user = await User.create({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    profileImage: userInfo.profileImage,
    uid: userInfo.uid,
  });

  if (!user) throw "Trouble signing you up";
  return userObject(user);
}

async function getUser(id) {
  let user = await User.findById(id);
  return userObject(user);
}

module.exports = {
  createUser,
  getUser,
};
