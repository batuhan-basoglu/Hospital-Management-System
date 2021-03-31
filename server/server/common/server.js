import Express from 'express';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as uuid from 'uuid';
import l from './logger';
import * as OpenApiValidator from 'express-openapi-validator';
import error from './error';
const db = require('../database/index');

const app = new Express();

export default class Server {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);

    const apiSpec = path.join(__dirname, 'api.yml');
    l.info(process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION);
    // const validateResponses = !!(
    //   process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
    //   process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    // );

    // enable CORS in development
    // eslint-disable-next-line no-constant-condition
    if (true) {
      app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        res.header(
          'Access-Control-Allow-Methods',
          'GET, PUT, POST, PATCH, DELETE, OPTIONS'
        );

        if (req.method.toLowerCase() === 'options') res.status(200).end();
        else next();
      });
    }

    // Assign a unique ID to each request
    app.use((req, res, next) => {
      req.id = uuid.v4().split('-').pop();
      res.set('X-Flow-Id', req.id);
      next();
    });

    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));

    app.use(process.env.OPENAPI_SPEC || '/spec', Express.static(apiSpec));
    // app.use(
    //   OpenApiValidator.middleware({
    //     apiSpec,
    //     validateResponses,
    //     ignorePaths: /.*\/spec(\/|$)/,
    //   })
    // );
  }

  router(routes) {
    routes(app);

    app.use(db.errorHandler);
    app.use(error.errorHandler);
    app.use(error.notFoundHandler);

    db.setup();

    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = (p) => () =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
