import cities from './cities';
import weatherForecast from './weatherForecast';

export default (app) => {
	app.use('/cities', cities);
	app.use('/weather', weatherForecast);
}