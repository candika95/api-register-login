import app from './server.js';

const port = process.env.PORT || 3000;

const startServer = () => {
  app.listen(port, () => {
    console.log(`api (jalan x, lari v) di port ${port} tod`);
  });
};

startServer();