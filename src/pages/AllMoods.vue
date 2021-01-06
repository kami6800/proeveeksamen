<template>
    <p v-if="moods.length<=0">Du har endnu ikke oprettet en aktivitet</p>
    <mood-card v-else v-for="mood in moods"
    :key="mood"
    :id="mood.id"
    :title="mood.title"
    :description="mood.description"
    :emoji="mood.mood"
    :timestamp="mood.timestamp"></mood-card>
    <router-link to="/add" class="float-right bg-green-800 rounded-full w-16 h-16 mt-16">
    <svg class="text-green-100 w-16 h-16">
      <use xlink:href="#plusIcon" />
    </svg>
    </router-link>
</template>

<script>
import MoodCard from "../components/MoodCard";
export default {
    components:{
        MoodCard
    },
    data(){
        return{
            moods: this.$store.getters.getMoods
        }
    }
}
</script>