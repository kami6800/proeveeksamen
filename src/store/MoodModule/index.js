import MoodMutations from "./mutations";
import MoodActions from "./actions";
import MoodGetters from "./getters";

export default {
    state(){
        return{
            moods:[]
        }
    },
    mutations: MoodMutations,
    actions: MoodActions,
    getters: MoodGetters
}