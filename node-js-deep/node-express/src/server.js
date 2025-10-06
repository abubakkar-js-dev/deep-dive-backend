const app = require("./app");
const dotenv = require('dotenv');
const connectMongodb = require("./config/db");

const PORT = process.env.PORT || 8000;

dotenv.config()





// connect to database

connectMongodb()
  .then(() => {
    // --- Start Server ---
    app.listen(PORT, () => {
      console.log(`✅ Server Started at PORT:${PORT}`);
      console.log(`🌐 Visit http://localhost:${PORT}/users`);
      console.log(`📡 API: http://localhost:${PORT}/api/users`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect with MongoDb ERROR: ", err);
  });
