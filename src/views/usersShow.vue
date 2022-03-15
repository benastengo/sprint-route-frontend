<script>
import axios from "axios";
export default {
  data: function () {
    return {
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
  <div>This is where a Map will be</div>
  <div class="home">
    <h3>{{ user.first_name + " " + user.last_name }}</h3>
    <h3>Tractor: {{ user.tractor_number }}</h3>
    <h3>Trailer: {{ user.trailer_number }}</h3>
    <h3>Location: {{ user.location }}</h3>
    <h3>Assigned Loads: {{ user.orders.length }}</h3>
    <!-- <h3>Completed Loads: {{ user.orders.fulfilled.length }}</h3> -->
    <!-- <h3>Unfulfilled Loads: {{ user.orders.fulfilled.length }}</h3> -->
  </div>
  <h1>Todays Loads:</h1>
  <div v-for="order in user.orders" v-bind:key="order.id">
    <h2>Load Origin:</h2>
    <h2>Blend(s): {{ order.blend }}</h2>
    <h2>Volume (GL): {{ order.volume }}</h2>
    <h2>Store: {{ order.customer.name + ", " + order.customer.address }}</h2>
  </div>
</template>

<style></style>
