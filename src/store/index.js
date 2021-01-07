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
            //save to localstorage
            localStorage.setItem("moods", JSON.stringify(state.moods));
        },
        deleteMood(state, payload){
            console.log(state.moods[0].id != payload);
            //Delete mood
            state.moods = state.moods.filter(function(mood){console.log(mood.id, payload); return mood.id != payload});
            //Save to localstorage
            localStorage.setItem("moods", JSON.stringify(state.moods));
        },
        editMood(state, payload){
            const index = state.moods.findIndex(mood=>mood.id===payload.id);
            state.moods[index].title = payload.title;
            state.moods[index].description = payload.description;
            //Save to localstorage
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