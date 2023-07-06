<script lang='ts'>
// @ts-nocheck

	import Search from '../lib/Search.svelte';
	import { ToastNotification } from "carbon-components-svelte";
	import {weatherDataCode} from '../interface/types';
	import type {weatherDataType} from '../interface/types';
	import { Loading } from "carbon-components-svelte";

	import { tick } from 'svelte';

	let isSearching = false;
	let searchResult:weatherDataType = null;

	let showWarning ,showInfo,showError, showAvailableData;

	$:{
		showWarning = searchResult && (searchResult.code === weatherDataCode.InvalidInput);
		console.log('改变showWarning',showWarning);
	}
	$:{
		showInfo = searchResult && (searchResult.code === weatherDataCode.InvalidData);
		console.log('改变showWarning',showWarning);
	}
	$:{
		showError =searchResult && (searchResult.code === weatherDataCode.ServerError);
		console.log('改变showError',showError);
	}
	$:{
		showAvailableData = searchResult && (searchResult.code === weatherDataCode.SuccessData);
		console.log('改变showAvailableData',showAvailableData);
	}

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
	<div class="w-3/5 h-full flex flex-col items-center">
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
