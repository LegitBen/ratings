<template>
  <div id="app">
    <GroupingObjects />
  </div>
</template>

<script>
import GroupingObjects from "./components/GroupingObjects.vue";
export default {
  name: "App",
  components: {
    GroupingObjects,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
