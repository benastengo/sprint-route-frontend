<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      user: {},
    };
  },
  created: function () {
    axios.get("/users/" + this.$route.params.id).then((response) => {
      console.log("User Show", response);
      this.user = response.data;
    });
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
</template>

<style></style>
