import { responseError, responseSuccess } from '../helpers/responseHelper';
import fetch from 'node-fetch-retry';
import wiki from 'wikijs';

export const getListOfCities = async (req, res) => {
  try {
    const params = new URLSearchParams({
      username: 'IRYNA',
      // country: 'CA',
      maxRows: 100,
      style: 'SHORT',
      featureCode1: 'PPL',
      featureCode2: 'PPLA',
      featureCode3: 'PPLC',
      cities: 'CITIES15000',
    });

    const response = await fetch(
      `http://api.geonames.org/searchJSON?${params}`,
      {
        retry: 3,
        pause: 3000,
        callback: retry => { console.log(`Trying: ${retry}`) }
      }
    );
    const data = await response.json();

    responseSuccess(res, 200, data.geonames);
  } catch (e) {
    responseError(res, e.code || 404, [e.message])
  }
}

export const getCityDescription = async (req, res) => {
  const { city } = req.params;

  await wiki()
    .page(city)
    .then(page => page
      .chain()
      .summary()
      .request())
    .then(result => responseSuccess(res, 200, { description: result.extract }))
    .catch(e => responseError(res, e.code || 404, [e.message]));
}