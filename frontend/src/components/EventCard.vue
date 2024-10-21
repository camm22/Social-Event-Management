<template>
    <router-link class="event-link" :to="{ name: 'EventDetails', params: { id: event.id } }">
        <div class="event-card">
            <span>@{{ event.time }} on {{ event.date }}</span>
            <h4>{{ event.title }}</h4>
            <button v-if="isAuth && (username === event.organizer || role === 'ROLE_ADMIN')" @click.prevent="deleteCard">delete</button>
        </div>
    </router-link>
</template>

<script>
import EventService from '../services/EventService.js';

export default {
    name: 'EventCard',
    data(){
        return{
            isAuth: null,
            username: null,
            role: null,
        }
    },
    created() {
        this.isAuth = this.$store.state.isAuth;
        this.username = localStorage.getItem('username');
        this.role = localStorage.getItem('role');
    },
    watch: {
        '$store.state.isAuth'(newIsAuth) {
            this.isAuth = newIsAuth;
        },
    },
    props: {
        event: {
            type: Object,
            required: true,
        },
    },
    methods: {
        deleteCard() {
            EventService.deleteEvent(this.event.id).then().catch(error => console.log(error));
            this.$emit('deleteCardFromChild', this.event.id);
        },
    },
};
</script>


<style scoped>
.event-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid navy;
    /* Navy border for the card */
    background-color: white;
    /* White background for the card */
    margin-bottom: 18px;
    border-radius: 10px;
    /* Rounded corners */
    transition: transform 0.3s, box-shadow 0.3s;
    /* Smooth transition for hover effects */
}

.event-card:hover {
    transform: scale(1.05);
    /* Slightly larger scale on hover */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    /* Shadow effect on hover */
}

.event-link {
    color: #0056b3;
    /* Navy blue color for the link */
    text-decoration: none;
}

.event-link h4 {
    color: #2c3e50;
    /* Deep navy blue for the event title */
    margin-bottom: 10px;
    /* Space below the title */
}

span {
    color: #39495c;
    /* Slightly lighter navy blue for the date and time */
    font-size: 0.9em;
}

button {
    padding: 5px 10px;
    background-color: #0056b3;
    /* Navy blue background for the button */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #003366;
    /* Darker shade for hover effect */
}</style>

