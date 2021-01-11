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
        loadApp(state){
            const login = localStorage.getItem("login");
            if(login){
                state.username = login;
                state.isAuthorized = true;
            }
        },
        login(state, payload){
            state.isAuthorized = true;
            state.username = payload.username;
            localStorage.setItem("login", payload.username);
        },
        logout(state){
            state.isAuthorized = false;
            state.username = "";
            //localStorage.removeItem("login");
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
            if(state.moods.length>=1) return;

            console.log(state.username);
            fetch(`https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/${state.username}/moods.json`)
            .then(function(response){
                if(response.ok)
                    return response.json();
            }).then(function(data){
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

                results.forEach(function(r){state.moods.push(r)});
                //state.moods = results;
            });
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
           //localStorage.setItem("moods", JSON.stringify(state.moods));
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
        loadApp(context){
            context.commit("loadApp");
        },
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