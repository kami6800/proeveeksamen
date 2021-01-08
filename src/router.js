import {createRouter, createWebHistory} from "vue-router";
import AllMoods from "./pages/AllMoods";
import AddMood from "./pages/AddMood";
import NotFound from "./pages/NotFound";
import LoginScreen from "./pages/LoginScreen";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path: "/", redirect: "/login"},
        {path: "/login", component: LoginScreen},
        {path:"/all", component:AllMoods},
        {path: "/add", component:AddMood},
        {path: "/:notFound(.*)", component:NotFound}
    ]
});


export default router;