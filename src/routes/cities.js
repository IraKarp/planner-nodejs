import express from 'express';
import * as citiesController from '../controllers/cities';

const router = express.Router();

router.get('/list', citiesController.getListOfCities);

router.get('/description/:city', citiesController.getCityDescription)

export default router;