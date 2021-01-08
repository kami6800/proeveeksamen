<template>
    <div class="m-0 m-auto w-1/2">
        <label class="mt-16 block">Username</label>
        <input class="block">
        <label class="mt-4 block">Password</label>
        <input class="block">
        <button @click="login" class="my-8 bg-green-800 text-white p-2 px-4 rounded transition-all duration-150
                   hover:bg-green-600 hover:shadow-lg">Login</button>
        <p>No account? <router-link class="text-blue-600 font-semibold hover:text-blue-400" to="/all">Sign up</router-link></p>
     </div>
</template>

<script>
export default {
    methods:{
        login(){
            this.$router.push("/all");
        }
    }
}
</script>