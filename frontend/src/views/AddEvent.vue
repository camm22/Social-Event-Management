<template>
    <form @submit.prevent="submitEventForm">
        <h1>Create an Event</h1>
        <label for="category">Select a category: </label>
        <select name="category" v-model="newEvent.category" required>
            <option value="">--Chose a category--</option>
            <option v-for="(cat, index) in category" :key="index">{{ cat }}</option>
        </select>
        <h4>Name & Describe your event</h4>
        <label for="title">Title</label>
        <br>
        <input type="text" name="title" placeholder="Title" v-model="newEvent.title" required>
        <br>
        <label for="description">Description</label>
        <br>
        <input type="text" name="description" placeholder="Description" v-model="newEvent.description" required>
        <h4>Where is your event ?</h4>
        <label for="location">Location</label>
        <br>
        <input type="text" name="location" placeholder="Location" v-model="newEvent.location" required>
        <h4>When is your event ?</h4>
        <label for="date">Date</label>
        <br>
        <input type="date" name="date" v-model="newEvent.date" required>
        <br>
        <label for="time">Time</label>
        <br>
        <input type="time" name="time" v-model="newEvent.time" required>
        <br>
        <button class="submit-button" type="submit" :disabled="loading">Create</button>
    </form>
</template>

<script>
import EventService from '../services/EventService.js';

export default {
    name: 'AddEvent',
    data() {
        return {
            category: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
            newEvent: {
                id: 0,
                category: '',
                title: '',
                description: '',
                location: '',
                date: '',
                time: '',
                petsAllowed: true,
                organizer: localStorage.getItem('username'),
            },
            loading: false,
        };
    },
    methods: {
        submitEventForm() {
            //EventService.getEvents().then(response =>this.eventListTemp = response.data).catch(error => console.log(error));
            // while(this.eventListTemp.some(event => event.id === this.newEvent.id)){
            //     this.newEvent.id++;
            // } msk ca sert à rien enft
            this.loading = true;
            EventService.addEvent(this.newEvent).then(() => {
                this.$router.push({ name: 'EventList' });
                this.newEvent = {
                    id: 0,
                    category: '',
                    title: '',
                    description: '',
                    location: '',
                    date: '',
                    time: '',
                    petsAllowed: true,
                    organizer: localStorage.getItem('username'),
                };
            }).catch(error => console.log(error)).finally(() => this.loading = false);
        },
    },
};
</script>

<style scoped>
form {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: white;
    border: 1px solid navy;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    text-align: left;
}

h1,
h4 {
    color: navy;
    text-align: center;
    margin-bottom: 20px;
}

label {
    color: #2c3e50;
    /* Deep navy blue for text */
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="date"],
input[type="time"],
select {
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
}</style>

