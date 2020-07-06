import server from './server';

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server has been started on http://localhost:${port}`);
  console.log(`Frontend - http://localhost:8080`);
});
