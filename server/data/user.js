const { User } = require("../models");

userObject = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profileImage: user.profileImage,
  };
};

validateUserInfo = (user) => {
  if (!user) throw "Provide user details";
  if (!user.firstName) throw "Provide firstname";
  if (!user.lastName) throw "Provide lastname";
  if (!user.email) throw "Provide email";
};

async function getAllUsers() {
  const data = await User.find({});
  const users = data.map((user) => userObject(user));
  return users;
}

async function createUser(userInfo) {
  validateUserInfo(userInfo);
  let user = await User.create({
    _id: userInfo.uid,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    fullName: userInfo.firstName + userInfo.lastName,
    profileImage: userInfo.profileImage,
  });

  if (!user) throw new Error("Trouble signing you up");
  return userObject(user);
}

async function getUser(id) {
  if (!id) throw new Error("Id must be supplied");
  let user = await User.findById(id);
  if (!user) throw new Error("User not found!");
  return userObject(user);
}

async function updateUser(id, userPayload) {
  try {
    let user = await getUser(id);
    if (
      user.firstName === userPayload.firstName &&
      user.lastName === userPayload.lastName &&
      user.profileImage === userPayload.profileImage
    ) {
      throw new Error("Nothing to update");
    }

    if (userPayload.firstName && userPayload.lastName)
      userPayload.fullName = userPayload.firstName + userPayload.lastName;
    else if (userPayload.firstName)
      userPayload.fullName = userPayload.firstName + user.lastName;
    else if (userPayload.lastName)
      userPayload.lastName = user.firstName + userPayload.lastName;

    let updatedUser = await User.findByIdAndUpdate(id, userPayload, {
      new: true,
    });
    return updatedUser;
  } catch (e) {
    throw e;
  }
}

async function searchUser(searchData) {
  let vname;
  let vemailId;
  let users = [];

  if (searchData.name !== undefined) {
    vname = new RegExp(searchData.name.toLowerCase());
    users = await User.find({ fullName: vname });
  } else if (searchData.email !== undefined) {
    vemailId = new RegExp(searchData.email.toLowerCase());
    users = await User.find({ email: vemailId });
  } else {
    users = await User.find({});
  }

  return users;
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  searchUser,
};
