<template>
    <p v-if="moods.length<=0" class="my-16">Du har endnu ikke oprettet en aktivitet</p>
    <transition-group class="relative" v-else tag="div" name="mood-list">
    <mood-card v-for="mood in moods"
    :key="mood"
    :id="mood.id"
    :title="mood.title"
    :description="mood.description"
    :emoji="mood.mood"
    :timestamp="mood.timestamp"></mood-card>
    </transition-group>
    <router-link to="/add" class="float-right bg-green-800 rounded-full w-16 h-16 my-16 transition-all duration-150
                                    hover:bg-green-600 hover:shadow-lg">
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
            //moods: this.$store.getters.getMoods
        }
    },
    computed:{
        moods(){
            return this.$store.getters.getMoods;
        }
    },
    mounted(){
        this.$store.dispatch("loadApp");
        this.$store.dispatch("loadMoods");
        console.log("mounted");
    }
}
</script>

<style scoped>
    .mood-list-leave-from{
        transform: translateY(0px);
        opacity:1;
    }

    .mood-list-leave-active{
        transition: all 0.5s ease-out;
        position: absolute;
    }

    .mood-list-leave-to{
        transform: translateY(-500px);
        opacity:0;
    }

    /* .mood-list-enter-to{
        transform: translateY(0px);
        opacity:1;
    }

    .mood-list-enter-active{
        transition: all 0.5s ease-in;
    }

    .mood-list-enter-from{
        transform: translateY(-50px);
        opacity:0;
    } */

    .mood-list-move{
        transition: all 1s ease;
    }
</style>