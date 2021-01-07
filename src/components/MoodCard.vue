<template>
    <div class="w-11/12 p-4 pb-8 m-4 bg-white break-words">
        <button @click="deleteCard" class="float-right">X</button>
        <input class="font-bold text-xl p-2 border" v-model="titleModel" :readonly="!isEditing">
        <h3 class="font-thin text-sm">{{timeSince}}</h3>
        <textarea class="w-full h-24 p-2 border" v-model="descModel" :readonly="!isEditing"></textarea>

         <svg v-if="!isEditing" class="sadEmoji h-10 w-10 mt-2 text-yellow-300">
            <use v-bind:href="emote" />
         </svg>
         <mood-emojis v-else @emoji-changed="changeSelectedMood" :checked-mood="selectedMood"></mood-emojis>

        <button v-if="!isEditing" @click="startEditing" class="w-6 h-6 float-right
                        hover:h-18 hover:w-18">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        </button>
        <button v-else @click="stopEditing" class="float-right">Save</button>
    </div>
</template>

<script>
import MoodEmojis from './MoodEmojis.vue';
export default {
  components: { MoodEmojis },
    props:["id", "title", "description", "emoji", "timestamp"],
    data(){
        return{
            time:this.timestamp,
            //emote:"#" + this.emoji,
            isEditing:false,
            selectedMood: this.emoji,
            titleModel:this.title,
            descModel:this.description
        }
    },
    computed:{
        emote(){
            return "#" + this.emoji;
        },
        timeSince(){
            let seconds = Math.floor((Date.now() - this.time) / 1000);
            let interval = seconds/31536000;
            if(interval>1){
                interval = Math.floor(interval);
                if(interval === 1)
                    return interval + " year ago";
                else
                    return interval + " years ago";
            }

            interval = seconds / 2592000;
            if(interval>1){
                interval = Math.floor(interval);
                if(interval === 1)
                    return interval + " month ago";
                else
                    return interval + " months ago";
            }

            interval = seconds / 86400;
            if(interval>1){
                interval = Math.floor(interval);
                if(interval === 1)
                    return interval + " day ago";
                else
                    return interval + " days ago";
            }

            interval = seconds / 3600;
            if(interval>1){
                interval = Math.floor(interval);
                if(interval === 1)
                    return interval + " hour ago";
                else
                    return interval + " hours ago";
            }

            interval = seconds / 60;
            if(interval>1){
                interval = Math.floor(interval);
                if(interval === 1)
                    return interval + " minute ago";
                else
                    return interval + " minutes ago";
            }
            
            if(seconds >1){
                return seconds + " seconds ago";
            }

            return "now";
        }
    },
    methods:{
        deleteCard(){
            this.$store.dispatch("deleteMood", this.id);
            console.log(this.id);
        },
        startEditing(){
            this.isEditing = true;
        },
        stopEditing(){
            this.isEditing = false;
            const moodObject = {
                id: this.id,
                title: this.titleModel,
                description: this.descModel,
                mood: this.selectedMood
            }
            this.$store.dispatch("editMood", moodObject);
        },
        changeSelectedMood(val){
            this.selectedMood = val;
        }
    }
}
</script>

<style scoped>
    input:read-only,
    textarea:read-only {
        border:none;
    }
</style>