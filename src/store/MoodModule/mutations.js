export default {
    loadMoods(state){
        //abort if moods already loaded
        if(state.moods.length>=1) return;

        //start http request
        fetch(`https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/${this.state.username}/moods.json`)
        .then(function(response){
            if(response.ok)
                return response.json();
        }).then(function(data){
            //load results
            console.log(data);
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
            console.log(results);
            results.forEach(function(r){state.moods.push(r)});
            //state.moods = results;
        });
    },
    saveMood(state, payload){
        fetch(`https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/${this.state.username}/moods.json?id=${payload.id}`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload)
        });
    },
    updateMood(state, payload){
       fetch(`https://mood-8eedd-default-rtdb.europe-west1.firebasedatabase.app/${this.state.username}/moods.json?id=${payload.id}`, {
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
}