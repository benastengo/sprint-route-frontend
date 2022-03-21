<script>
export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
      flashMessage: null,
      isManager: localStorage.manager == "true",
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
      this.isManager = localStorage.manager == "true";
    },
  },
};
</script>

<template>
  <div id="nav">
    <router-link v-if="!isLoggedIn" to="/">Login</router-link>
    <router-link v-if="isLoggedIn" to="/logout">Logout</router-link>
    <router-link v-if="isManager" to="/users">Drivers</router-link>
    <router-link v-if="isManager" to="/orders/new">New Order</router-link>
    <router-link v-if="isManager" to="/signup">New Driver</router-link>
  </div>
  <router-view />
</template>
