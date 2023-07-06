import axios from 'axios';
import config from '../../src/.config'

const getWeather = function(location: string): Promise<any> {
    if (!location || location.trim() === '') {
      return Promise.reject('Invalid location!');
    }
  
    const address = `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${config.apikey}`;
  
    return new Promise(async (resolve, reject) => {
        try{
            let result = await axios.get(address);
            resolve(result.data);
        }catch(e){
            reject(e);
        }
    });
  };

export {
    getWeather
}