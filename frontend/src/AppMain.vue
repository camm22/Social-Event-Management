<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'AppMain.vue',
  components: {
    NavBar,
  },
  data() {
    return {

    };
  },

}
</script>

<style>
#app {
  font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: white;
  /* Set the entire app background to white */
  color: #2c3e50;
  /* Deep navy blue for main text color */
}

h4 {
  font-size: 20px;
  color: #0056b3;
  /* Bright blue color for headings, maintaining consistency */
}

/* Additional styling for your NavBar component */
nav {
  background-color: #003366;
  /* Navy blue background for the navbar */
  padding: 10px 20px;
  text-align: center;
  /* Center the navigation links */
}

nav a {
  color: white;
  /* White text for navbar links */
  text-decoration: none;
  /* Remove underline from links */
  margin: 0 15px;
  /* Space between links */
  transition: color 0.3s;
  /* Smooth color transition for hover effect */
}

nav a:hover {
  color: #00b7ff;
  /* Cyan color for hover effect */
}

nav a.router-link-exact-active {
  color: #7acff5;
  /* Highlight color for the active link */
  border-bottom: 2px solid #7acff5;
  /* Underline effect for the active link */
}
</style>

