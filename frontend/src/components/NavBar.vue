<template>
    <nav>
        <router-link class="routerbox" :to="{ name: 'EventList' }">Events</router-link> 
        <router-link class="routerbox" :to="{ name: 'AddEvent' }">Create Event</router-link>
        <router-link class="routerbox" v-if="!isAuth" :to="{ name: 'RegistrationUser' }">Register</router-link>
        <router-link class="routerbox" v-if="!isAuth" :to="{ name: 'LoginUser' }">Login</router-link>
        <router-link class="routerbox"  :to="{ name: 'AdminView' }">ADMIN</router-link>
        <p  v-if="isAuth" class="username-right">{{ username }}</p>
        <button v-if="isAuth" @click="userLogOut">Log Out</button>

    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            isAuth: null,
            username: null,
        };
    },
    created() {
        this.isAuth = this.$store.state.isAuth;
        this.username = localStorage.getItem('username');
    },
    watch: {
        '$store.state.isAuth'(newIsAuth) {
            this.isAuth = newIsAuth;
            this.username = localStorage.getItem('username');
        },
    },
    methods: {
        userLogOut() {
            localStorage.removeItem("user");
            this.$router.push({ name: "LoginUser" });
        }
    }

}
</script>

<style scoped>
nav {
    background: linear-gradient(to right, #003366, #0056b3);
    padding: 15px 30px;
    display: flex;
    justify-content: center;
    align-items: center; 
    border-bottom: 4px solid #007bff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    
}

router-link {
    color: white;
    border: none;
    text-decoration: none;
    font-size: 18px;
    padding: 5px 10px; 
    transition: color 0.3s, background-color 0.3s, box-shadow 0.3s, transform 0.3s; 
    border-radius: 5px; 
    flex-grow: 1; 
}



.routerbox {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    transition: color 0.3s, background-color 0.3s, box-shadow 0.3s;
    border-radius: 5px; 
    padding: 10px 10px 10px 10px ;
}

.routerbox:hover {
    background-color: rgba(255, 255, 255, 0.2); 
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); 
}

.username-right {
    margin-left: auto; 
    margin-right: 20px; 
    padding: 5px 10px;
    background-color: #007bff;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s, box-shadow 0.3s; 
}

button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    transition: color 0.3s, background-color 0.3s, box-shadow 0.3s;
    border-radius: 5px; 
    font-size: 16px;
    padding: 10px 10px 10px 10px ;
}

button:hover {
    background-color: rgba(255, 255, 255, 0.2); 
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); 
}

</style>




