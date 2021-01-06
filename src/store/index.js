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
        addMood(state, payload){
            state.moods.push(payload);
        }
    },
    actions:{
        addMood(context, payload){
            context.commit("addMood", payload);
        }
    },
    getters:{
        getMoods(state){
            return state.moods;
        }
    }
});


export default store;