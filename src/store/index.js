import {createStore} from "vuex";

const store = createStore({
    state(){
        return{
            moods:[],
            isAuthorized:false,
            username:""
        }
    },
    mutations:{
        login(state, payload){
            state.isAuthorized = true;
            state.username = payload.username;
        },
        logout(state){
            state.isAuthorized = false;
            state.username = "";
        },
        loadMoods(state){
            //state.moods = JSON.parse(localStorage.getItem("moods")) ?? [];
            // fetch("https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/moods.json")
            // .then(function(response){
            //     if(response.ok)
            //         return response.json();
            // }).then(function(data){
            //     state.moods = data;
            // });
            fetch(`https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/${state.username}/moods.json`)
            .then(function(response){
                if(response.ok)
                    return response.json();
            }).then(function(data){
                console.log(data);
                console.log(state.username);
                //load results
                const results = [];
                for(const id in data){
                    results.unshift({
                        id:data[id].id,
                        title:data[id].title,
                        timestamp: data[id].timestamp,
                        description: data[id].description,
                        mood: data[id].mood
                    });
                }

                //Sort results
                results.sort((a, b)=>a.id<b.id);

                state.moods = results;
            });
            console.log(state.username);
        },
        saveMood(state, payload){
            fetch(`https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/${state.username}/moods.json?id=${payload.id}`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(payload)
            });
        },
        updateMood(state, payload){
           fetch(`https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/${state.username}/moods.json?id=${payload.id}`, {
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
            this.commit("saveMood", payload);
        },
        deleteMood(state, payload){
            //Delete mood
            state.moods = state.moods.filter(function(mood){return mood.id != payload});
            this.commit("updateMood", payload);
        },
        editMood(state, payload){
            const index = state.moods.findIndex(mood=>mood.id===payload.id);
            state.moods[index].title = payload.title;
            state.moods[index].description = payload.description;
            state.moods[index].mood = payload.mood;
            this.commit("updateMood", payload);
        }
    },
    actions:{
        login(context, payload){
            context.commit("login", payload);
        },
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