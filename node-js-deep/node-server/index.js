const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const { URL } = require("url");
const port = 3000;
const newUrl = new url.URL("http://localhost:3000/about?name=unknown");
// console.log(newUrl.pathname);
// console.log(newUrl.host);
// console.log(newUrl.searchParams);

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end(); // Ignore favicon requests
  const ip = req["x-forwared-for"] || req.socket.remoteAddress;
  const log = `Request from ${ip} at ${new Date().toLocaleDateString()}. URL: ${
    req.url
  }\n`;
  //   const myUrl = url.parse(req.url,true);
  const myUrl = new URL(req.url, `https://${req.headers.host}`);

  const queryObject = myUrl.searchParams;
  console.log("Query Object: ", queryObject);
  console.log("My URL:", myUrl);
  fs.mkdir("logs", { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating logs directory", err);
      res.end("Internal Server Error");
    } else {
      fs.appendFile(
        path.join(__dirname, "./logs", "requests.txt"),
        log,
        (err) => {
          if (err) {
            console.log("Failed to write to log file", err);
          }
          let responseText;
          switch (myUrl.pathname) {
            case "/":
              responseText = "Home Page";
              break;
            case "/about":
              const userName = myUrl.query.name;
              responseText = `Hey ${userName}.`;
              break;
            case "/search":
              //   const searchTxt = myUrl.query.search_q || "";
              const searchTxt = myUrl.searchParams.get("search_q");
              console.log(searchTxt);
              responseText = `You searched for ${searchTxt}`;
              break;
            default:
              responseText = "404 Page Not Found";
          }
          res.end(responseText);
        }
      );
    }
  });

  console.log("Request has been made from the browser to the server");
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
