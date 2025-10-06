const express = require("express");
const mongoose = require('mongoose');
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;


// Schema 
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
    require: false,
    default: 'Unkown'
  },
  ipAddress: {
    type: String,
    required: false,
    default: 'Unknown'
  }
  
},{timestamps: true})


const User = mongoose.model('User',userSchema);

// connection

mongoose.connect('mongodb://127.0.0.1:27017/test-db-1')
.then(()=>{
  console.log('Mongodb connected');
})
.catch(err=>{
  console.log('Mongo Error: ',err);
})


// Middleware for parsing URL-encoded body (e.g., from HTML forms)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Custom Middleware ---

// 1️⃣ Logging Middleware
app.use((req, _res, next) => {
  const logEntry = `${Date.now()}: ${req.method} ${req.url} from ${
    req.ip || "Unknown IP"
  }\n`;
  fs.appendFile("log.txt", logEntry, (err) => {
    if (err) console.error("Error writing to log file:", err);
    console.log(`[LOG] ${logEntry.trim()}`);
    next();
  });
});

// 2️⃣ Custom Property Middleware
app.use((req, _res, next) => {
  req.myCustomProperty = "This is data added by a middleware!";
  req.authStatus = "Authenticated (mock)";
  next();
});

// --- Routes ---

// HTML Route
app.get("/users", async(req, res) => {
  const users = await User.find({});
  console.log(users,'From users');
  const html = `
    <h1>User List (HTML Rendered)</h1>
    <p>Middleware added: ${req.myCustomProperty}</p>
    <p>Auth Status: ${req.authStatus}</p>
    <ul>
      ${users
        .map((user) => `<li>${user.firstName} ${user.lastName}</li>`)
        .join("")}
    </ul>
    <p>Try <a href="/api/users">/api/users</a> for the raw JSON API.</p>
  `;
  return res.send(html);
});

// API: GET /api/users (List all)
app.get("/api/users", async(req, res) => {
    // res.setHeader('X-name','Abu Bakkar Siddik');
    // console.log(req.headers);
    const users = await User.find({});
  console.log(`Accessing /api/users. Custom property: ${req.myCustomProperty}`);
  return res.status(200).json({status: 'success',data: users});
});

// API: POST /api/users (Create new user)
app.post("/api/users", async(req, res) => { 
  const body = req.body;
  console.log(body);
  if (!body || !body.firstName || !body.email) {
    return res
      .status(400)
      .json({ status: "error", message: "First name and email are required." });
  }

  const newId = users.length + 1;
  const newUser = { id: newId, ...body };
  users.push(newUser);
  console.log(users);


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
  return res.status(201).json({status: 'success',message: 'The user has been created.'})
});

// API: /api/users/:id (Get, Patch, Delete)
app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const id = req.params.id; 
    console.log(id); 
    // const user = users.find((u) => u.id === id);
    const user = await User.findById(id);
      if (user) {
        // console.log(`Fetching user ${id}. Auth: ${req.authStatus}`);
        return res.status(200).json({status: 'success', data: user});
      } else {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }
    })
    .patch(async (req, res) => {
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
          return res.status(404).json({ status: "error", message: "User not found" });
        }

        console.log(`Patching user ${id}. Auth: ${req.authStatus}`);
        return res.json({
          status: "success",
          message: `User ${id} updated successfully.`,
          data: updatedUser,
        });
      } catch (err) {
        console.error("Patch error:", err);
        return res.status(500).json({ status: "error", message: "Failed to update user." });
      }
    })
    .delete(async(req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({status: 'error',message: 'Invalid user id'});
    }
    try{
      const deleteUser = await User.findByIdAndDelete(id);
      if(!deleteUser){
        return res.status(404).json({status: 'error',message: 'User not found'});
      }
      return res.status(200).json({status: 'success', message: `The ${id} user has been deleted successfully`});
    }catch(err){
      return res.status(500).json({status: 'error',message: 'Failed to delete user.'});
    }
  });

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`✅ Server Started at PORT:${PORT}`);
  console.log(`🌐 Visit http://localhost:${PORT}/users`);
  console.log(`📡 API: http://localhost:${PORT}/api/users`);
});
