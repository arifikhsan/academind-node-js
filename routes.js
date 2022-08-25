const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Hello World</title></head>');
    res.write('<body>');
    res.write('<h1>Hello World</h1>');
    res.write('<div><ol><li>Paijo</li><li>Slamet</li></ol></div>');
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="name"><button type="submit">Create</button></form>'
    );
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const name = parsedBody.split('=')[1];
      console.log(name);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

exports.handler = requestHandler;

