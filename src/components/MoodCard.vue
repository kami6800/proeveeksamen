<template>
    <div class="w-full p-4 m-4 bg-white">
        <h2 class="font-bold text-xl">{{title}}</h2>
        <h3 class="font-thin text-sm">{{timeSince}}</h3>
        <p>{{description}}</p>
    </div>
</template>

<script>
export default {
    props:["id", "title", "description", "emoji", "timestamp"],
    data(){
        return{
            time:this.timestamp
        }
    },
    computed:{
        timeSince(){
            return "hi";
        }
    }
}
</script>