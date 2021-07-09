/* eslint-disable require-jsdoc */
import {server as _server} from '@hapi/hapi';
import {routes} from './routes.js';
async function init() {
  const server = _server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}
init();
