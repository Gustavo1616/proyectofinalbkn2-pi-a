import "./src/helpers/setEnv.helper.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import router from "./src/routers/index.router.js";


const server = express();
const port = process.env.PORT;
const ready = async () => console.log('server ready on port ' + port);
server.listen(port, ready);

server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', __dirname + '/src/views');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser(process.env.COOKIE_KEY));
server.use(morgan('dev'));
server.use(express.static(__dirname + '/public'));
server.use((err, req, res, next) => {
  console.error(err.stack);
  if (process.env.NODE_ENV === 'production') {
    res.json500();
  } else {
    res.status(500).send(`<pre>${err.stack}</pre>`);
  }
});
server.use('/', router);
server.use(errorHandler);
server.use(pathHandler);
server.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));
