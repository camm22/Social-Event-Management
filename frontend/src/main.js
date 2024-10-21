import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './AppMain.vue';
import router from './router';

const store = createStore({
    state () {
      return {
        event: null,
        isAuth: null,
      }
    },
    mutations: {
      editEvent (state, eventData) {
        state.event = eventData;
      },
      editIsAuth(state, isAuthData){
        state.isAuth = isAuthData;
      },
    }
  });


createApp(App).use(router).use(store).mount('#app');

export default store;
