<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" v-on="{ deleteCardFromChild: deleteEventInList }" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue';
import EventService from '../services/EventService.js';

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: [],
      user: null,
    };
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data;
      }).catch(error => {
        console.log(error);
      });
  },
  methods: {
    deleteEventInList(id) {
      this.events = this.events.filter(event => event.id !== id);
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

.events {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 40px 20px; /* Adjust horizontal gap */
  margin: 0 auto; 
  max-width: 1200px; 
  justify-items: center; /* Center-align items */
}


</style>
