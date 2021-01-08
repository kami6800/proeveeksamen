import {createStore} from "vuex";

const store = createStore({
    state(){
        return{
            moods:[]
        }
    },
    mutations:{
        loadMoods(state){
            //state.moods = JSON.parse(localStorage.getItem("moods")) ?? [];
            fetch("https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/moods.json")
            .then(function(response){
                if(response.ok)
                    return response.json();
            }).then(function(data){
                state.moods = data;
            });
        },
        save(state){
           fetch("https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/moods.json", {
               method: "PUT",
               headers: {
                   "Content-Type":"application/json"
               },
               body: JSON.stringify(state.moods)
           });
           localStorage.setItem("moods", JSON.stringify(state.moods));
        },
        addMood(state, payload){
            //Add mood
            state.moods.unshift(payload);
            this.commit("save");
        },
        deleteMood(state, payload){
            //Delete mood
            state.moods = state.moods.filter(function(mood){return mood.id != payload});
            this.commit("save");
        },
        editMood(state, payload){
            const index = state.moods.findIndex(mood=>mood.id===payload.id);
            state.moods[index].title = payload.title;
            state.moods[index].description = payload.description;
            state.moods[index].mood = payload.mood;
            this.commit("save");
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