<script>
  import { Card } from "flowbite-svelte";

  export let adm1 = '北京市'
  export let name = '北京';
  export let text = '多云';
  export let windDir = '西南风'
  export let windSpeed = '4'
  export let humidity = '485';
  export let icon = '101';
  export let feelsLike = '32';
  export let vis = '28';
  export let pressure = '1000';
</script>

    <Card
        size='xl'
    >
        <h5 class="mt-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center mb-2">{adm1}/{name}</h5>
        <img class="inline-block self-center mb-4" src="/static/icons/{icon}.svg" alt="QWeather Icons" width="64" height="64">

        <div class='w-full flex  justify-center items-center gap-9'>
            <div class='w-16 h-20 flex flex-col justify-center items-center gap-3'>
                <p class='bold text-xl'>{text}</p>
                <p>天气</p>
            </div>
            <div class='w-16 h-20 flex flex-col justify-center items-center gap-3'>
                <p class='bold text-xl'>{windSpeed}级</p>
                <p>{windDir}</p>
            </div>
            <div class='w-16 h-20 flex flex-col justify-center items-center gap-3'>
                <p class='bold text-xl'>{humidity}%</p>
                <p>相对湿度</p>
            </div>
            <div class='w-16 h-20 flex flex-col justify-center items-center gap-3'>
                <p class='bold text-xl'>{feelsLike}&#176</p>
                <p>体感温度</p>
            </div>
            <div class='w-16 h-20 flex flex-col justify-center items-center gap-3'>
                <p class='bold text-xl'>{vis}km</p>
                <p>能见度</p>
            </div>
            <div class='w-16 h-20 flex flex-col justify-center items-center gap-3'>
                <p class='bold text-xl'>{pressure}hPa</p>
            <p>大气压</p>
            </div>
        </div>
      </Card>

<style>

</style>