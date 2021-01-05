import {createRouter, createWebHistory} from "vue-router";
import AllMoods from "./pages/AllMoods";
import AddMood from "./pages/AddMood";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:"/all", component:AllMoods},
        {path: "/add", component:AddMood}
    ]
});


export default router;