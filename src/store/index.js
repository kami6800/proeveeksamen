import {createStore} from "vuex";
import MoodModule from "./MoodModule/index.js";

const store = createStore({
    modules:{
        moods: MoodModule
    },
    state(){
        return{
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
            localStorage.removeItem("login");
        },
        createUser(state, payload){
            console.log("re");

            
            //console.log("passed");

            fetch(`https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/${payload.username}/password.json`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload.password)
        });
        }
    },
    actions:{
        loadApp(context){
            context.commit("loadApp");
        },
        login(context, payload){
            context.commit("login", payload);
        },
        logout(context){
            context.commit("logout");
        },
        createUser(context, payload){

            //check if password exists by seeing if they have a password set
            fetch(`https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/${payload.username}/password.json`)
        .then(function(response){
            if(response.ok)
                return response.json();
            else console.log("bad reqqq");
        }).then(function(data){
            //abort if user has a password
            for(const password in data){
                console.log(data[password]);
                return;
            }
            //continue if no password found
            context.commit("createUser", payload);
        });
            
        }
    }
});


export default store;