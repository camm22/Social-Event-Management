<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
        <h5>{{ event.organizer }}</h5>
        <router-link v-if="event.organizer === username || role === 'ROLE_ADMIN'" class="edit-button" :to="{ name: 'EditEvent', params: { id: event.id } }">Edit Event</router-link>
    </div>
</template>

<script>
import EventService from '../services/EventService.js';

export default {
    data() {
        return {
            event: null,
            username: null,
            role: null,
        }
    },
    props: {
        id: String,
    },
    created() {
        this.username = localStorage.getItem('username');
        console.log(this.username);

        this.role = localStorage.getItem('role');
        console.log(this.role);

        EventService.getEvent(this.id).then(response => {
            this.$store.commit('editEvent', response.data);
            this.event = this.$store.state.event;
        }).catch(error => {
            console.log(error);
        });
    },
};
</script>

<style scoped>
div {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: white;
    border: 1px solid navy;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    text-align: left;
}

h1 {
    color: navy;
    text-align: center;
}

p {
    color: #2c3e50;
    /* Deep navy blue for text */
    margin-bottom: 15px;
    line-height: 1.6;
}

.edit-button {
    display: inline-block;
    padding: 10px 15px;
    background-color: #0056b3;
    /* Navy blue background */
    color: white;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;
}

.edit-button:hover {
    background-color: #003366;
    /* Darker shade for hover effect */
}</style>

