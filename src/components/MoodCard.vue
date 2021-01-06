<template>
    <div class="w-full p-4 m-4 bg-white break-words">
        <button @click="deleteCard" class="float-right">X</button>
        <h2 class="font-bold text-xl">{{title}}</h2>
        <h3 class="font-thin text-sm">{{timeSince}}</h3>
        <p>{{description}}</p>
         <svg class="sadEmoji h-10 w-10 mt-2 text-yellow-300">
            <use v-bind:href="emote" />
            </svg>
    </div>
</template>

<script>
export default {
    props:["id", "title", "description", "emoji", "timestamp"],
    data(){
        return{
            time:this.timestamp,
            emote:"#" + this.emoji
        }
    },
    computed:{
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
        }
    }
}
</script>