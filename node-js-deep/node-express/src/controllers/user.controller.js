const mongoose = require('mongoose');
const User = require("../models/user.model");

async function handleCreateUser(req,res){
     const body = req.body;
  console.log(body);
  if (!body || !body.firstName || !body.email) {
    return res
      .status(400)
      .json({ status: "error", message: "First name and email are required." });
  }

  const newUser = { 
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    jobTitle: body.jobTitle,
    ipAddress: body.ipAddress
  };

  // fs.writeFile("src/MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
  //   if (err) {
  //     console.error("Error writing to MOCK_DATA.json:", err);
  //     return res
  //       .status(500)
  //       .json({ status: "error", message: "Failed to save user data." });
  //   }
  //   console.log(`New user created: ${newUser.first_name}`);
  //   return res
  //     .status(201)
  //     .json({ status: "success", id: newId, customData: req.myCustomProperty });
  // });

  const result = await User.create(newUser);
  console.log(result);
  return res
    .status(201)
    .json({ status: "success", message: "The user has been created.", data: result });
}

async function handleGetAllUsers(req, res) {
  // res.setHeader('X-name','Abu Bakkar Siddik');
  // console.log(req.headers);
  try{

  }catch(err){
    return res.status(500).json({status: 'error',message: 'Failed to get all users.'});
  }
  const users = await User.find({});
  console.log(`Accessing /api/users. Custom property: ${req.myCustomProperty}`);
  return res.status(200).json({ status: "success", data: users });
}

async function handleGetUserById(req, res) {
  const id = req.params.id;
  console.log(id);
  // const user = users.find((u) => u.id === id);
  const user = await User.findById(id);
  if (user) {
    // console.log(`Fetching user ${id}. Auth: ${req.authStatus}`);
    return res.status(200).json({ status: "success", data: user });
  } else {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
}

async function handleUpdateUserById(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    // Only update provided fields
    const updateFields = {};
    if (body.firstName !== undefined) updateFields.firstName = body.firstName;
    if (body.lastName !== undefined) updateFields.lastName = body.lastName;
    if (body.email !== undefined) updateFields.email = body.email;
    if (body.jobTitle !== undefined) updateFields.jobTitle = body.jobTitle;
    if (body.ipAddress !== undefined) updateFields.ipAddress = body.ipAddress;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    console.log(`Patching user ${id}. Auth: ${req.authStatus}`);
    return res.json({
      status: "success",
      message: `User ${id} updated successfully.`,
      data: updatedUser,
    });
  } catch (err) {
    console.error("Patch error:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to update user." });
  }
}

async function handleDeleteUserById(req, res) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid user id" });
  }
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    return res.status(200).json({
      status: "success",
      message: `The ${id} user has been deleted successfully`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to delete user." });
  }
}

module.exports = {
  handleCreateUser,  
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
};
