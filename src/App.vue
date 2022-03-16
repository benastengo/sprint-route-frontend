<script>
export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
      flashMessage: null,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>

<template>
  <div id="nav">
    <router-link v-if="!isLoggedIn" to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
    |
    <router-link to="/logout">Logout</router-link>
    |
    <router-link to="/users">Drivers</router-link>
    |
    <router-link to="/orders/new">New Order</router-link>
  </div>
  <router-view />
</template>
