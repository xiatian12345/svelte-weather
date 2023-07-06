<script lang='ts'>
// @ts-nocheck

	import Search from '../lib/Search.svelte';
	import { ToastNotification } from "carbon-components-svelte";
	import {weatherDataCode} from '../interface/types';
	import type {weatherDataType} from '../interface/types';
	import { Loading } from "carbon-components-svelte";
	import { tick } from 'svelte';

	let isSearching = false;
	// let searchResult:weatherDataType = null;
	let searchResult:weatherDataType = {
    "code": 4,
    "message": "获取数据成功",
    "data": [
        {
            "code": "200",
            "updateTime": "2023-07-07T03:42+08:00",
            "fxLink": "https://www.qweather.com/weather/guangzhou-101280101.html",
            "now": {
                "obsTime": "2023-07-07T03:34+08:00",
                "temp": "29",
                "feelsLike": "32",
                "icon": "151",
                "text": "多云",
                "wind360": "199",
                "windDir": "西南风",
                "windScale": "1",
                "windSpeed": "4",
                "humidity": "85",
                "precip": "0.0",
                "pressure": "1000",
                "vis": "28",
                "cloud": "91",
                "dew": "26"
            },
            "refer": {
                "sources": [
                    "QWeather",
                    "NMC",
                    "ECMWF"
                ],
                "license": [
                    "CC BY-SA 4.0"
                ]
            },
            "location": {
                "name": "广州",
                "id": "101280101",
                "lat": "23.12518",
                "lon": "113.28064",
                "adm2": "广州",
                "adm1": "广东省",
                "country": "中国",
                "tz": "Asia/Shanghai",
                "utcOffset": "+08:00",
                "isDst": "0",
                "type": "city",
                "rank": "11",
                "fxLink": "https://www.qweather.com/weather/guangzhou-101280101.html"
            }
        },
        {
            "code": "200",
            "updateTime": "2023-07-07T03:42+08:00",
            "fxLink": "https://www.qweather.com/weather/zengcheng-101280104.html",
            "now": {
                "obsTime": "2023-07-07T03:36+08:00",
                "temp": "28",
                "feelsLike": "30",
                "icon": "151",
                "text": "多云",
                "wind360": "103",
                "windDir": "东南风",
                "windScale": "1",
                "windSpeed": "5",
                "humidity": "82",
                "precip": "0.0",
                "pressure": "1005",
                "vis": "30",
                "cloud": "100",
                "dew": "26"
            },
            "refer": {
                "sources": [
                    "QWeather",
                    "NMC",
                    "ECMWF"
                ],
                "license": [
                    "CC BY-SA 4.0"
                ]
            },
            "location": {
                "name": "增城",
                "id": "101280104",
                "lat": "23.29050",
                "lon": "113.82958",
                "adm2": "广州",
                "adm1": "广东省",
                "country": "中国",
                "tz": "Asia/Shanghai",
                "utcOffset": "+08:00",
                "isDst": "0",
                "type": "city",
                "rank": "23",
                "fxLink": "https://www.qweather.com/weather/zengcheng-101280104.html"
            }
        },
    ]
}

	$:showWarning = searchResult && (searchResult.code === weatherDataCode.InvalidInput);
	$:showInfo = searchResult && (searchResult.code === weatherDataCode.InvalidData);
	$:showError =searchResult && (searchResult.code === weatherDataCode.ServerError);
	$:showAvailableData = searchResult && (searchResult.code === weatherDataCode.SuccessData);

	const startSearch = ()=>{
		isSearching = true;
	}
	const endSearch = async (e)=>{
		isSearching = false;
		searchResult = e.detail;
		await tick();
		console.log(searchResult,showWarning,showError,showAvailableData);
	}
</script>
<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="w-full h-full flex flex-col  justify-center items-center">
	<div class='placeholder'></div>
	<div class="w-3/5 h-full flex flex-col items-center gap-10">
		<Search on:startSearch={startSearch} on:endSearch={endSearch}/>

		{#if isSearching}
		<Loading/>
		{/if}

		{#if showAvailableData}
		<h1>有效的数据。。。。。。。。</h1>
		{/if}


		{#if showInfo}
		<ToastNotification
					timeout={2000}
					kind='info'
					title="消息"
					subtitle={searchResult.message}
					caption={new Date().toLocaleString()}
					on:close={()=>{searchResult = null;console.log('closed....');}}
			/>
		{/if}

		{#if showWarning}
		<ToastNotification
					timeout={2000}
					kind='warning'
					title="警告"
					subtitle={searchResult.message}
					caption={new Date().toLocaleString()}
					on:close={()=>{searchResult = null;console.log('closed....');}}
			/>
		{/if}

		{#if showError}
		<ToastNotification
				timeout={2000}
				kind='error'
				title="错误"
				subtitle={searchResult.message}
				caption={new Date().toLocaleString()}
				on:close={()=>{searchResult = null;}}
			/>
		{/if}
	</div>
	<div class='placeholder'></div>
</div>
<style>
	.placeholder{
		height:25%;
		width:0px;
	}
</style>
