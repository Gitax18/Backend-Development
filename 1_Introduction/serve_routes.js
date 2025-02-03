const http = require("http");

const html = `<html>
  <head><title> A Simple Form</title></head>
  <body>
    <form action="/message" method="POST">
      <input type="text" name="message" placeholder="enter your name..."/>
      <button type="submit">Submit</button>
    </form>
  </body>
  </html>`;

const api_git = {
  name: "gitanshu",
  age: 20,
  address: {
    lat: 14.54552,
    lng: -21.46782,
  },
};

const api_tan = {
  name: "tan",
  age: 17,
  address: {
    lat: 26.88967,
    lng: -11.77652,
  },
};

function handleRequest(req, res) {
  const url = req.url;
  switch (url) {
    case "/":
      res.setHeader("content-type", "text/html");
      res.write(JSON.stringify(api_git));
      break;
    case "/tanay":
      res.setHeader("content-type", "text/html");
      res.write(JSON.stringify(api_tan));
      break;
    case "/form":
      res.setHeader("content-type", "text/html");
      const arr = html.split(/\r?\n/);
      arr.forEach((ele, i) => res.write(ele));
      break;
    case "/message":
      const method = req.method;
      let parsedBody;
      const body = [];
      // storing stream chuck
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      // after getting complete stream, parsing it to readable form
      req.on("end", () => {
        parsedBody = Buffer.concat(body).toString();
        if (method == "POST") {
          const data = parsedBody.split("=")[1];
          console.log(data);
          res.statusCode = 302;
          if (data == "gitanshu") {
            res.setHeader("Location", "/");
          } else if (data == "tanay") {
            res.setHeader("Location", "/tanay");
          }
        }
        res.end();
      });
      return;
    default:
      res.write(JSON.stringify({ data: null }));
      res.end();
      break;
  }
}

const server = http.createServer(handleRequest);

server.listen(3000);
