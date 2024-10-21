<template>
    <form @submit.prevent="submitUpdatedEvent">
        <h1>Edit Event</h1>
        <label for="category">Select a category: </label>
        <br>
        <select name="category" v-model="event.category">
            <option v-for="(cat, index) in category" :key="index">{{ cat }}</option>
        </select>
        <br>
        <label for="title">Title</label>
        <br>
        <input type="text" name="title" v-model="event.title">
        <br>
        <label for="description">Description</label>
        <br>
        <input type="text" name="description" v-model="event.description">
        <br>
        <label for="location">Location</label>
        <br>
        <input type="text" name="location" v-model="event.location">
        <br>
        <label for="date">Date</label>
        <br>
        <input type="date" name="date" v-model="event.date">
        <br>
        <label for="time">Time</label>
        <br>
        <input type="time" name="time" v-model="event.time">
        <br>
        <br>
        <button class="submit-button" type="submit" :disabled="loading">edit</button>
    </form>
</template>

<script>
import EventService from '../services/EventService.js';

export default {
    name: 'EditEvent',
    data() {
        return {
            event: null,
            category: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
            loading: false,
        };
    },
    created() {
        this.event = this.$store.state.event;
    },
    methods: {
        submitUpdatedEvent() {
            this.loading = true;
            EventService.editEvent(this.event).then(() => {
                this.$router.push({ name: 'EventDetails', path: `/event/${this.event.id}` });
            }).catch(error => console.log(error)).finally(() => this.loading = false);
        },
    },
}

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

h1 {
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


