const server = require('./config/serverChat')

const port = process.env.PORT || 80;

server.listen(port, () => {
  console.log(`Server chat running at http://localhost:${port}`);
});