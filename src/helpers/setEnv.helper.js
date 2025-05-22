import { config } from 'dotenv';
import args from './setArgs.helper.js';

const { mode } = args;
const path = ".env" + (mode && "." + mode);
config({ path });
console.log(`Mode: ${args.mode}\nCargando variables desde: ${path}`);


const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const COOKIE_KEY = process.env.COOKIE_KEY;
const SESSION_KEY = process.env.SESSION_KEY;
const SECRET = process.env.SECRET;
const GOOGLE_ID = process.env.GOOGLE_ID;
const GOGGLE_SECRET = process.env.GOGGLE_SECRET;
const GOOGLE_EMAIL = process.env.GOOGLE_EMAIL;
const GOOGLE_PASSWORD = process.env.GOOGLE_PASSWORD;
const PERSISTENCE = process.env.PERSISTENCE;
const NODE_ENV = process.env.NODE_ENV;

const env = {
    PORT,
    MONGO_URL,
    COOKIE_KEY,
    SESSION_KEY,
    SECRET,
    GOOGLE_ID,
    GOGGLE_SECRET,
    GOOGLE_EMAIL,
    GOOGLE_PASSWORD,
    PERSISTENCE,
    NODE_ENV,
};
export default env;