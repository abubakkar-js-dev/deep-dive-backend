const express = require("express");
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUser } = require("../controllers/user.controller");

const router = express.Router();

// --- Routes ---

// HTML Route
// router.get("/users", async(req, res) => {
//   const users = await User.find({});
//   console.log(users,'From users');
//   const html = `
//     <h1>User List (HTML Rendered)</h1>
//     <p>Middleware added: ${req.myCustomProperty}</p>
//     <p>Auth Status: ${req.authStatus}</p>
//     <ul>
//       ${users
//         .map((user) => `<li>${user.firstName} ${user.lastName}</li>`)
//         .join("")}
//     </ul>
//     <p>Try <a href="/api/users">/api/users</a> for the raw JSON API.</p>
//   `;
//   return res.send(html);
// });

// API: GET /api/users (List all)
router.get("/", handleGetAllUsers);

// API: POST /api/users (Create new user)
router.post("/", handleCreateUser);

// API: /api/users/:id (Get, Patch, Delete)
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
