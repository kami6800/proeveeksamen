import {createStore} from "vuex";

const store = createStore({
    state(){
        return{
            moods:[{
                id:3,
                title:"test",
                description:"ytest",
                mood:4,
                timestamp: new Date(2017, 11, 24, 10, 33, 30, 0)
            },
            {
                id:5,
                title:"test33",
                description:"ytest33",
                mood:1,
                timestamp: new Date(2018, 11, 24, 10, 33, 30, 0)
            }]
        }
    },
    getters:{
        getMoods(state){
            return state.moods;
        }
    }
});


export default store;