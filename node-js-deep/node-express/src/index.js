const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;



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
app.get("/users", (req, res) => {
  const html = `
    <h1>User List (HTML Rendered)</h1>
    <p>Middleware added: ${req.myCustomProperty}</p>
    <p>Auth Status: ${req.authStatus}</p>
    <ul>
      ${users
        .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
        .join("")}
    </ul>
    <p>Try <a href="/api/users">/api/users</a> for the raw JSON API.</p>
  `;
  return res.send(html);
});

// API: GET /api/users (List all)
app.get("/api/users", (req, res) => {
    // res.setHeader('X-name','Abu Bakkar Siddik');
    // console.log(req.headers);
  console.log(`Accessing /api/users. Custom property: ${req.myCustomProperty}`);
  return res.json(users);
});

// API: POST /api/users (Create new user)
app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body || !body.first_name || !body.email) {
    return res
      .status(400)
      .json({ status: "error", message: "First name and email are required." });
  }

  const newId = users.length + 1;
  const newUser = { id: newId, ...body };
  users.push(newUser);
  console.log(users);


  fs.writeFile("src/MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("Error writing to MOCK_DATA.json:", err);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to save user data." });
    }
    console.log(`New user created: ${newUser.first_name}`);
    return res
      .status(201)
      .json({ status: "success", id: newId, customData: req.myCustomProperty });
  });
});

// API: /api/users/:id (Get, Patch, Delete)
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    if (user) {
      console.log(`Fetching user ${id}. Auth: ${req.authStatus}`);
      return res.json(user);
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    console.log(`Patching user ${id}. Auth: ${req.authStatus}`);
    return res.json({
      status: "Pending Patch (Update) for user ID " + id,
      data: req.body,
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    console.log(`Deleting user ${id}. Auth: ${req.authStatus}`);
    return res.json({ status: "Pending Delete for user ID " + id });
  });

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`✅ Server Started at PORT:${PORT}`);
  console.log(`🌐 Visit http://localhost:${PORT}/users`);
  console.log(`📡 API: http://localhost:${PORT}/api/users`);
});
