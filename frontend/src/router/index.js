import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import EventDetails from '../views/EventDetails.vue';
import EditEvent from '../components/EditEvent.vue'
import AddEvent from '../views/AddEvent.vue';
import RegistrationUser from '../views/RegistrationUser.vue';
import LoginUser from '../views/LoginUser.vue';
import VueJwtDecode from "vue-jwt-decode";
import AdminView from '../views/AdminView';

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    meta: {
      requiresAuth: false,
      requiresAdmin: false,

    },
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true,
    component: EventDetails,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,

    },
  },
  {
    path: '/add',
    name: 'AddEvent',
    props: true,
    component: AddEvent,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/event/:id/edit',
    name: 'EditEvent',
    props: true,
    component: EditEvent,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/auth/register',
    name: 'RegistrationUser',
    props: true,
    component: RegistrationUser,
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    path: '/auth/login',
    name: 'LoginUser',
    props: true,
    component: LoginUser,
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    path: '/admin',
    name: 'AdminView',
    props: true,
    component: AdminView,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});



async function isAuthenticated() {
  const { default: store } = await import('../main.js');
  const token = localStorage.getItem('user');
  if (token) {
    const decodedToken = VueJwtDecode.decode(token);
    const currentTime = Date.now() / 1000;
    const isValid = decodedToken.exp > currentTime;

    store.commit('editIsAuth', isValid);
    return isValid;
  }
  store.commit('editIsAuth', false);
  return false;
}


async function isAdmin() {
  return localStorage.getItem('role') === 'ROLE_ADMIN';
}

router.beforeEach(async (to, from, next) => {
  const auth = await isAuthenticated();
  const admin = await isAdmin(); // Assurez-vous que cette fonction est correctement définie

  // Vérifie si la route requiert l'authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth) {
      // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
      next('/auth/login');
      return;
    }

    // Vérifie si la route requiert le statut d'administrateur
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (!admin) {
        // Si l'utilisateur n'est pas administrateur, empêche l'accès et le maintient sur la même page
        next(false);
        return;
      }
    }

    // Si l'utilisateur est authentifié et (si nécessaire) est administrateur, continue la navigation
    next();
    return;
  }

  // Si la route ne requiert pas l'authentification, continue la navigation
  next();
});


export default router;
