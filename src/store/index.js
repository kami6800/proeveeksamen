import {createStore} from "vuex";

const store = createStore({
    state(){
        return{
            moods:[{
                id:3,
                title:"test",
                description:"ytest",
                mood:4,
                timestamp: new Date(2021, 0, 6, 11, 19)
            },
            {
                id:5,
                title:"test33",
                description:"ytest33",
                mood:1,
                timestamp: new Date(2019, 11, 24, 10, 33, 30, 0)
            }]
        }
    },
    mutations:{
        loadMoods(state){
            state.moods = JSON.parse(localStorage.getItem("moods")) ?? [];
        },
        addMood(state, payload){
            //Add mood
            state.moods.unshift(payload);
            this.commit("save");
        },
        deleteMood(state, payload){
            console.log(state.moods[0].id != payload);
            //Delete mood
            state.moods = state.moods.filter(function(mood){console.log(mood.id, payload); return mood.id != payload});
            this.commit("save");
        },
        editMood(state, payload){
            const index = state.moods.findIndex(mood=>mood.id===payload.id);
            state.moods[index].title = payload.title;
            state.moods[index].description = payload.description;
            state.moods[index].mood = payload.mood;
            console.log("edit");
            this.commit("save");
        },
        save(state){
        //     console.log("save");
        //    fetch("https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/moods.json", {
        //        method: "POST",
        //        headers: {
        //            "Content-Type":"application/json"
        //        },
        //        body: JSON.stringify(state.moods)
        //    });
           localStorage.setItem("moods", JSON.stringify(state.moods));
        }
    },
    actions:{
        loadMoods(context){
            context.commit("loadMoods");
        },
        addMood(context, payload){
            context.commit("addMood", payload);
        },
        deleteMood(context, payload){
            context.commit("deleteMood", payload);
        },
        editMood(context, payload){
            context.commit("editMood", payload)
        }
    },
    getters:{
        getMoods(state){
            return state.moods;
        }
    }
});


export default store;