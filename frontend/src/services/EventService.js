import axios from 'axios';

const apiClient = axios.create({
    baseURL: `http://localhost:5000`,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default {
    getEvents() {
        return apiClient.get('/events');
    },
    getEvent(id) {
        return apiClient.get(`/events/${id}`);
    },
    deleteEvent(id) {
        return apiClient.delete(`/events/${id}`);
    },
    addEvent(newEvent) {
        return apiClient.post('/events', newEvent);
    },
    editEvent(updatedEvent){
        return apiClient.put(`/events/${updatedEvent.id}`, updatedEvent);
    },
};
