import { responseError, responseSuccess } from '../helpers/responseHelper';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config()

const { WEATHER_KEY } = process.env;

export const getWeatherForecast = async (req, res) => {
	try {
		const { cityName } = req.params;

		const params = new URLSearchParams({
			contentType: 'json',
			unitGroup: 'metric',
			include: 'days',
			key: WEATHER_KEY
		});
		const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/next7days?${params}`, {
			retry: 3,
			pause: 3000,
			callback: retry => { console.log(`Trying: ${retry}`) }
		});
		const data = await response.json();

		responseSuccess(res, 200, data)
	} catch (e) {
		responseError(res, e.code || 404, [e.message])
	}
}