<template>
  <router-link class="p-1" to="all">
    <svg class="text-green-800 w-7 h-7 transition-all duration-150
                                    hover:text-green-500">
      <use xlink:href="#arrowBack" />
    </svg>
  </router-link>
  
  <form @submit.prevent="addMood">
    <p class="mb-2">Hvordan har du det?</p>
    <input class="w-full h-10 p-2 border" type="text" ref="title"/>
    <mood-emojis @emoji-changed="changeSelectedMood" :checked-mood="3"></mood-emojis>
    <p class="mb-2">Beskrivelse</p>
    <textarea class="w-full p-2 h-52 border" ref="description"/>
    <button class="float-right px-4 py-2 mt-8 bg-green-800 text-white rounded transition-all duration-150
                                    hover:bg-green-600 hover:shadow-lg" type="submit">Gem</button>
  </form>
</template>

<script>
export default {
  data(){
    return{
      selectedMood:3
    };
  },
  methods:{
    addMood(){
      //return to all moods
      this.$router.push("/all");

      //Add mood
      const mood = {
        id:Date.now(),
        timestamp:Date.now(),
        title: this.$refs.title.value,
        description: this.$refs.description.value,
        mood: this.selectedMood
      }
      this.$store.dispatch("addMood", mood);

      
    },
    changeSelectedMood(newMood){
      this.selectedMood = newMood;
    }
  }
}
</script>