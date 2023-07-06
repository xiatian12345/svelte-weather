import axios, { AxiosError } from 'axios';
import config from '../../src/.config';
import type { weatherDataType } from './types';
import { weatherDataCode } from './types';

const getWeather = function(location: string): Promise<any> {
    if (!location || location.trim() === '') {
        let data:weatherDataType = {
            code:weatherDataCode.InvalidInput,
            message:'无效的输入'
        }
        return Promise.reject(data);
    }
  
    const address = `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${config.apikey}`;
  
    return new Promise(async (resolve, reject) => {
        try{
            let result = await axios.get(address);
            let code = weatherDataCode.InvalidData;
            let message = '获取数据失败';
            let data = {};

            if(result.data.code === '200'){
                code = weatherDataCode.SuccessData;
                message = '获取数据成功';
            }
            let weatherDataType:weatherDataType = {
                code,
                message,
                data
            }
            resolve(weatherDataType);
        }catch(e){
            let err = e as AxiosError;

            let data:weatherDataType = {
                code:weatherDataCode.ServerError,
                message:err.name +" : "+ err.code,
            }
            resolve(data);
        }
    });
  };

export {
    getWeather
}