<template>
    <div class="flex justify-around">
        <label>
            <input type="radio" name="emojis" value="1" v-model="emoji" :checked="checkedMood==1">
            <svg class="sadEmoji">
            <use xlink:href="#1" />
            </svg>
        </label>
        <label>
            <input type="radio" name="emojis" value="2" v-model="emoji" :checked="checkedMood==2">
            <svg class="sadEmoji">
            <use xlink:href="#2" />
            </svg>
        </label>
        <label>
            <input type="radio" name="emojis" value="3" v-model="emoji" :checked="checkedMood==3">
            <svg class="sadEmoji">
            <use xlink:href="#3" />
            </svg>
        </label>
        <label>
            <input type="radio" name="emojis" value="4" v-model="emoji" :checked="checkedMood==4">
            <svg class="sadEmoji">
            <use xlink:href="#4" />
            </svg>
        </label>
        <label>
            <input type="radio" name="emojis" value="5" v-model="emoji" :checked="checkedMood==5">
            <svg class="sadEmoji">
            <use xlink:href="#5" />
            </svg>
        </label>
    </div>
</template>

<script>
export default {
    emits:["emojiChanged"],
    props:["checkedMood"],
    data(){
        return{
            emoji: null
        }
    },
    watch:{
        emoji(){
            this.$emit("emojiChanged", this.emoji);
        }
    }
}
</script>