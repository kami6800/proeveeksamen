<template>
  <router-link to="all">
    <svg class="text-green-800 w-7 h-7">
      <use xlink:href="#arrowBack" />
    </svg>
  </router-link>
  
  <form @submit.prevent="addMood">
    <p class="mb-2">Hvordan har du det?</p>
    <input class="w-full h-10 p-2 border" type="text" ref="title"/>
    <mood-emojis @emoji-changed="changeSelectedMood"></mood-emojis>
    <p class="mb-2">Beskrivelse</p>
    <textarea class="w-full p-2 h-52 border" ref="description"/>
    <button class="float-right px-4 py-2 mt-8 bg-green-800 text-white rounded" type="submit">Gem</button>
  </form>
</template>

<script>
import MoodEmojis from "../components/MoodEmojis"
export default {
  components:{
    MoodEmojis
  },
  data(){
    return{
      selectedMood:3
    };
  },
  methods:{
    addMood(){
      const mood = {
        id:Date.now(),
        timestamp:Date.now(),
        title: this.$refs.title.value,
        description: this.$refs.description.value,
        mood: this.selectedMood
      }
      this.$store.dispatch("addMood", mood);

      localStorage.setItem("moods", JSON.stringify(this.$store.getters.getMoods));
    },
    changeSelectedMood(newMood){
      this.selectedMood = newMood;
    }
  }
}
</script>