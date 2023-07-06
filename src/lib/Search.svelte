<script lang='ts'>
  import { Search } from "carbon-components-svelte";
  import SearchAdvanced from "carbon-icons-svelte/lib/SearchAdvanced.svelte";
  import {getWeather} from '../interface/serve';


  let searchInput = '';
  const handleKeyup = (e:KeyboardEvent)=>{
    if(e.code === 'Enter'){
      getWeather(searchInput)
        .then((data)=>{
          if(data.code === '200'){

          }else{

          }
          searchInput = '';
        })
        .catch((e)=>{
          console.log(e.message);
        });
    }
  }
</script>

<Search 
  icon={SearchAdvanced} 
  placeholder='输入城市查询天气1'
  on:keyup={handleKeyup}
  bind:value={searchInput}
  />