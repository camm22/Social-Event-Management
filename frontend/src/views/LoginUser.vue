<template>
    <form @submit.prevent="submitLoginForm">
        <h1>Login you :</h1>
        <label for="username">Username</label>
        <br>
        <input type="text" name="username" placeholder="username" v-model="user.username" required>
        <br>
        <label for="password">Password</label>
        <br>
        <input type="text" name="password" placeholder="password" v-model="user.password" required>
        <br>
        <p class="error-p">{{ errorMessage }}</p>
        <br>
        <button class="submit-button" type="submit" :disabled="loading">Login</button>
    </form>
</template>

<script>
import LoginService from '../services/LoginService.js';

export default {
    name: 'LoginUser',
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
            errorMessage: null,
        };
    },
    methods: {
        submitLoginForm() {
            this.loading = true;

            LoginService.addLogin(this.user)
                .then(response => {
                    let token = response.data.accessToken;
                    localStorage.setItem("user", token);
                    localStorage.setItem("username", response.data.username);
                    localStorage.setItem("role", response.data.roles[0]);
                    this.$router.push({ name: 'EventList' });
                })
                .catch(error => {
                    console.log(error)
                    if (error.response && error.response.data) {
                        this.errorMessage = error.response.data.message;
                    } else {
                        this.errorMessage = 'An error occurred.';
                    }
                }).finally(() => this.loading = false);
        },
    },
};
</script>

<style>
form {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: white;
    border: 1px solid navy;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

h1 {
    color: navy;
    text-align: center;
}

label {
    color: #2c3e50;
    /* Deep navy blue for text */
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #0056b3;
    /* Navy blue background */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #003366;
    /* Darker shade for hover effect */
}

.submit-button:disabled {
    background-color: #cccccc;
    /* Light gray when disabled */
    cursor: default;
}


.error-p{
    color: red;
}

</style>

