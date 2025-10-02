const { error } = require("console");
const { prototype } = require("events");
const http = require("http");
const url = require("url");
const { URL } = require("url");

const PORT = process.env.PORT || 5000;

// User in memory

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

let nextId;

//  helper function to purse request body

// const getRequestBody = (req)=>{
//     return new Promise((resolve,reject)=>{
//         let body = '';
//         req.on('data', chunk=>{
//             body += chunk.toString();
//         })
//         req.on('end',()=>{
//             try{
//                 resolve(body ? JSON.parse(body): {})
//             }catch(err){
//                 reject(err);
//             }
//         })
//         req.on('error',(err)=>{
//             reject(err);
//         })
//     })
// }

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    res.on("end", () => {
      try {
        res.end(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    res.on("error", (err) => reject(err));
  });
};

// helper function to send json object

const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application-json" });
  res.end(JSON.stringify(data));
};

// create server

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method;

  // allow cors
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // handle pre-fight request
  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    if (path === "/" && method === "GET")
      res.end("The server is working perfectly");
    // api routes
    if (path === "/api/users" && method === "GET") {
      // get all users
      sendJSON(res, 200, { success: true, data: users });
    } else if (path.match(/^\/api\/users\/(\d+)$/)) {
      // get single user
      const id = parseInt(path.split("/")[3]);
      const user = users.find((user) => user.id === id);
      if (!user) {
        sendJSON(res, 404, { success: false, message: "User not found" });
      }
      sendJSON(res, 200, { success: true, data: user });
    }else if(path === '/api/users' && method === 'POST'){
      // create user
      const body = getRequestBody(req);

      if(!body.email || !body.name){
        sendJSON(res,400,{success: false, message: 'Name and email are required'});
      }

      const newUser = {
        id: nextId++,
        name: body.name,
        email: body.email,
      }
      users.push(newUser); 
      sendJSON(res,201,{success: true,data: newUser});
    }
  } catch (err) {
    console.error("ERROR: ", err);
    sendJSON(res, 500, { success: "false", message: "Internal Server Error" });
  }
});

server.listen(PORT, () => {
  console.log(`The server listening on PORT: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
