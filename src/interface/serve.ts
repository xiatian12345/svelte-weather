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
  
    const cityAddress = `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${config.apikey}`;
  
    return new Promise(async (resolve, reject) => {
        try{
            let result = await axios.get(cityAddress);
            let code = weatherDataCode.InvalidData;
            let message = '获取数据失败';
            let data = {};

            if(result.data.code === '200'){

                const locations = result.data.location;

                let locationsPromises = locations.map((item: { id: any; })=>{
                    const cityId = item.id;
                    const weatherAddress = `https://devapi.qweather.com/v7/weather/now?location=${cityId}&key=${config.apikey}`;
                    return new Promise(async (res,rej)=>{
                        try{
                            console.log('0000000');
                            let result = await axios.get(weatherAddress);//如果这里抛出reject,输出的结果是  10个0000000  1个2222222  10个6666666
                            console.log('11111111');
                            res(result);
                        }catch(e){
                            console.log('66666666');
                            let err = e as AxiosError;

                            let data:weatherDataType = {
                                code:weatherDataCode.ServerError,
                                message:err.name +" : "+ err.code,
                            }
                            resolve(data);
                        }   
                    });
                });
                console.log('222222222');
                let r = await Promise.all(locationsPromises);
                console.log('555555555');
                data = r.map((item,index)=>{
                    item.data['location'] = locations[index];
                    return item.data;
                });
                
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
            console.log('3333333333');
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