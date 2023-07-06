<script lang='ts'>
  import { Search } from "carbon-components-svelte";
  import SearchAdvanced from "carbon-icons-svelte/lib/SearchAdvanced.svelte";
  import {getWeather} from '../interface/serve';

  import {createEventDispatcher} from 'svelte';

  const dispatcher = createEventDispatcher();

  let searchInput = '';
  const handleKeyup = (e:KeyboardEvent)=>{
    if(e.code === 'Enter'){
      dispatcher('startSearch');
      getWeather(searchInput)
        .then((data)=>{
          dispatcher('endSearch',data)
          searchInput = '';
        })
        .catch((data)=>{
          dispatcher('endSearch',data)
        });
    }
  }
</script>

<Search 
  icon={SearchAdvanced} 
  placeholder='输入城市查询天气'
  on:keyup={handleKeyup}
  bind:value={searchInput}
  autofocus={true}
  />