<template>
  <div id="app">
    <nav>Reviews</nav>
    <ReviewsList />
  </div>
</template>

<script>
import ReviewsList from "./components/ReviewsList";
export default {
  name: "app",
  components: {
    ReviewsList
  }
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #8d95a3;
  height: 100vh;
}

nav {
  background: #0057b3;
  color: #ffffff;
  font-weight: bold;
  padding: 2% 0 2% 4%;
  font-size: 1.5em;
}
</style>
