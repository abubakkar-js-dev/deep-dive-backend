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

let nextId = 3;

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
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    }); 
    req.on("error", (err) => reject(err));
  });
};

// helper function to send json object

const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application-json" });
  res.end(JSON.stringify(data));
};

// create server

const server = http.createServer(async(req, res) => {
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
    } else if (path.match(/^\/api\/users\/(\d+)$/) && method === "GET") {
      // get single user
      const id = parseInt(path.split("/")[3]);
      const user = users.find((user) => user.id === id);
      if (!user) {
        sendJSON(res, 404, { success: false, message: "User not found" });
      }
      sendJSON(res, 200, { success: true, data: user });
    }else if(path === '/api/users' && method === 'POST'){
      // create user
      const body = await getRequestBody(req);
      console.log(body);

      const isEmailExist = users.some(user=> user.email === body.email );

      if(!body.email || !body.name){
        sendJSON(res,400,{success: false, message: 'Name and email are required'});
        return;
      }else if(isEmailExist){
        sendJSON(res,409,{success: true,message: 'User is already exist.'});
        return; 
      }


      const newUser = {
        id: nextId++,
        name: body.name,
        email: body.email,
      }
      users.push(newUser); 
      sendJSON(res,201,{success: true,data: newUser});
    }else if(path.match(/^\/api\/users\/\d+$/) && method === 'PUT'){
      // Update User
      const id = parseInt(path.split('/')[3]);
      console.log(id,"FROM ID");
      const body = await getRequestBody(req);
      const index = users.findIndex(user=> user.id === id);

      if(index !== -1){ 
        users[index] = {
          ...users[index],
          name: body.name || users[index].name,
          email: body.email || users[index].email,
        }
        sendJSON(res,200,{success: true, data: users[index]});
      }else{
        sendJSON(res,404,{success: false,message: 'User not found'});
      }
    }else if(path.match(/^\/api\/users\/\d+$/) && method === 'DELETE'){
      // Delete User
      const id = parseInt(path.split('/')[3]);
      const index = users.findIndex(u=> u.id === id);
      console.log(index,'From index')

      if(index !== -1){
        const deleted = users.splice(index,1);
        sendJSON(res, 200, { success: true, data: deleted[0]})

      }else{
        sendJSON(res, 404, { success: false, message: 'User not found' });
      }
    }else{
      // route not found
      sendJSON(res,404,{success: false, message: 'Route not found'});
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
