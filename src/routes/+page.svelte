<script>
	import Search from '../lib/Search.svelte';

	let isSearching = false;
	/**
	 * @type {null}
	 */
	let searchResult = null;
	const startSearch = ()=>{
		isSearching = true;
	}

	// @ts-ignore
	const endSearch = (e)=>{
		isSearching = false;
		if(e.detail.code != 0){

		}else{
			searchResult = e.detail.data;
		}
	}
</script>
<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="bg-green-100 w-full h-full flex justify-center items-center">
	<div class="bg-red-100 w-4/5 h-full flex flex-col items-center">
		<Search on:startSearch={startSearch} on:endSearch={endSearch}/>


		{#if isSearching}
		<h1>正在搜索中。。。。。。。。</h1>
		{/if}

		{#if !!searchResult}
		<h1>搜索结果。。。。。。。。。</h1>
		{/if}
	</div>
</div>
<style>
</style>
