<script>
import axios from "axios";
export default {
  data: function () {
    return {
      users: [],
    };
  },
  created: function () {
    this.indexUsers();
  },
  methods: {
    indexUsers: function () {
      axios.get("/users").then((response) => {
        console.log("users index", response);
        this.users = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="users-index">
    <h1>All users</h1>
    <div v-for="user in users" v-bind:key="user.id">
      <h2>{{ user.first_name + " " + user.last_name }}</h2>
      <p>Tractor: {{ user.tractor_number }}</p>
      <p>Trailer: {{ user.trailer_number }}</p>
      <p>Location: {{ user.location }}</p>
      <p v-for="order in user.orders" v-bind:key="order.id">Loads: {{ order.customer.name }}</p>
      <router-link :to="`/users/${user.id}`" tag="button">Profile</router-link>
    </div>
  </div>
</template>
