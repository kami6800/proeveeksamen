<template>
  <button>
    <svg class="text-green-800 w-7 h-7 my-2">
      <use xlink:href="#arrowBack" />
    </svg>
  </button>
  
  <form>
    <p class="mb-2">Hvordan har du det?</p>
    <input class="w-full h-10 p-2 border" type="text"/>
    <mood-emojis></mood-emojis>
    <p class="mb-2">Beskrivelse</p>
    <textarea class="w-full p-2 h-52 border" />
    <button class="float-right px-4 py-2 mt-8 bg-green-800 text-white rounded" type="submit">Gem</button>
  </form>
</template>

<script>
import MoodEmojis from "../components/MoodEmojis"
export default {
  components:{
    MoodEmojis
  }
}
</script>