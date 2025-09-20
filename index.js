const http = require("http");

let server = http.createServer((req, res) => {
  let method = req.method;
  let id = req.url.split("/")[1 | null];
  let body = [];
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      switch (method) {
        case "GET":
          if (id) {
            res.end("You want an employee with id: " + id + ".");
          } else {
            res.end("You want to get all the employees.");
          }
          break;
        case "POST":
          res.end("You want to create a new employee." + body);
          break;
        case "PUT":
          res.end("You want to update an employee fully.");
          break;
        case "PATCH":
          res.end("You want to update an employee partially.");
          break;
        case "DELETE":
          res.end("You want to delete an employee.");
          break;

        default:
          res.end("I don't serve such request.");
          break;
      }
    });
});

server.listen(3000, () => {
  console.log("Server is listening for HTTP requests on port 3000");
});
