const Hapi = require('@hapi/hapi');
const routes = require('./routes.js');

const environment = process.env.NODE_ENV || 'dev';

// 2. Muat file .env yang sesuai dengan lingkungan
require('dotenv').config({
  path: `.env.${environment}`,
});

const init = async () => {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 9000;
  const server = Hapi.server({
    port: port,
    host: host,
    routes: {
      cors:{
        origin: ['*'],
      }
    }
  });
  server.route(routes);
  await server.start();
  console.log(`(${environment}) Server berjalan pada ${server.info.uri}`);
};

init();