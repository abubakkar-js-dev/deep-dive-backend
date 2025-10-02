const http = require('http');
const url = require('url');

// In-memory data store
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

let nextId = 3;

// Helper function to parse request body
const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', err => reject(err));
  });
};

// Helper function to send JSON response
const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// Create server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    // Routes
    if (path === '/api/users' && method === 'GET') {
      // GET all users
      sendJSON(res, 200, { success: true, data: users });

    } else if (path.match(/^\/api\/users\/\d+$/) && method === 'GET') {
      // GET single user
      const id = parseInt(path.split('/')[3]);
      const user = users.find(u => u.id === id);
      
      if (user) {
        sendJSON(res, 200, { success: true, data: user });
      } else {
        sendJSON(res, 404, { success: false, message: 'User not found' });
      }

    } else if (path === '/api/users' && method === 'POST') {
      // CREATE user
      const body = await getRequestBody(req);
      
      if (!body.name || !body.email) {
        sendJSON(res, 400, { success: false, message: 'Name and email are required' });
        return;
      }

      const newUser = {
        id: nextId++,
        name: body.name,
        email: body.email
      };
      
      users.push(newUser);
      sendJSON(res, 201, { success: true, data: newUser });

    } else if (path.match(/^\/api\/users\/\d+$/) && method === 'PUT') {
      // UPDATE user
      const id = parseInt(path.split('/')[3]);
      const body = await getRequestBody(req);
      const index = users.findIndex(u => u.id === id);
      
      if (index !== -1) {
        users[index] = {
          ...users[index],
          name: body.name || users[index].name,
          email: body.email || users[index].email
        };
        sendJSON(res, 200, { success: true, data: users[index] });
      } else {
        sendJSON(res, 404, { success: false, message: 'User not found' });
      }

    } else if (path.match(/^\/api\/users\/\d+$/) && method === 'DELETE') {
      // DELETE user
      const id = parseInt(path.split('/')[3]);
      const index = users.findIndex(u => u.id === id);
      
      if (index !== -1) {
        const deleted = users.splice(index, 1);
        sendJSON(res, 200, { success: true, data: deleted[0] });
      } else {
        sendJSON(res, 404, { success: false, message: 'User not found' });
      }

    } else {
      // Route not found
      sendJSON(res, 404, { success: false, message: 'Route not found' });
    }

  } catch (err) {
    console.error('Error:', err);
    sendJSON(res, 500, { success: false, message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`GET    http://localhost:${PORT}/api/users - Get all users`);
  console.log(`GET    http://localhost:${PORT}/api/users/:id - Get user by ID`);
  console.log(`POST   http://localhost:${PORT}/api/users - Create new user`);
  console.log(`PUT    http://localhost:${PORT}/api/users/:id - Update user`);
  console.log(`DELETE http://localhost:${PORT}/api/users/:id - Delete user`);
});