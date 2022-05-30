import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes';
import cors from 'cors';

dotenv.config()

const { PORT , CORS_ALLOWED } = process.env;
const app = express();

const corsOptions = {
	origin: CORS_ALLOWED,
	optionsSuccessStatus: 200,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions))
routes(app);

app.listen(PORT, ()=> console.log(`Server listening on ${PORT}!`))