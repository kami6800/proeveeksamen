export default {
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
};