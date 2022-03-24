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
  <h1>Drivers</h1>
  <div class="users-index container">
    <div class="card-group mt-3">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div v-for="user in users" v-bind:key="user.id" class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <router-link :to="`/users/${user.id}`" tag="button">
                  {{ user.first_name + " " + user.last_name }}
                </router-link>
              </h5>
              <p class="card-text" v-bind:key="user.id">
                Assigned Loads:
                {{ user.orders.length }}
              </p>
              <p class="card-text">
                <small class="text-muted">Location: {{ user.location }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-for="user in users" v-bind:key="user.id">
      <h2>
        <router-link :to="`/users/${user.id}`" tag="button">{{ user.first_name + " " + user.last_name }}</router-link>
      </h2>
      <p>Tractor: {{ user.tractor_number }}</p>
      <p>Trailer: {{ user.trailer_number }}</p>
      <p>Location: {{ user.location }}</p>
      <p v-if="user.orders.length > 0">Loads:</p>
      <p v-for="order in user.orders" v-bind:key="order.id">{{ order.customer.name }}</p>
    </div> -->
  </div>
</template>
