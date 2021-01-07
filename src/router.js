import {createRouter, createWebHistory} from "vue-router";
import AllMoods from "./pages/AllMoods";
import AddMood from "./pages/AddMood";
import NotFound from "./pages/NotFound";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path: "/", redirect: "/all"},
        {path:"/all", component:AllMoods},
        {path: "/add", component:AddMood},
        {path: "/:notFound(.*)", component:NotFound}
    ]
});


export default router;