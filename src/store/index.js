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
            //localStorage.removeItem("login");
        }
    },
    actions:{
        loadApp(context){
            context.commit("loadApp");
        },
        login(context, payload){
            context.commit("login", payload);
        }
    }
});


export default store;