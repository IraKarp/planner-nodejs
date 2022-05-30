import express from 'express';
import * as weatherController from '../controllers/weatherForecast';

const router = express.Router();

router.get('/:cityName', weatherController.getWeatherForecast)

export default router;