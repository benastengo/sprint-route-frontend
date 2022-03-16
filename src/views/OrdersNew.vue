<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newOrderParams: {},
      errors: [],
    };
  },
  created: function () {},
  methods: {
    createOrder: function () {
      axios
        .post("/orders", this.newOrderParams)
        .then((response) => {
          console.log("orders create", response);
          this.$router.push("/orders");
        })
        .catch((error) => {
          console.log("orders create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="orders-new">
    <h1>New Order</h1>
    <form v-on:submit.prevent="createOrder()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Driver:
      <input type="text" v-model="newOrderParams.user_id" />
      Customer:
      <input type="text" v-model="newOrderParams.customer_id" />
      Blend:
      <input type="text" v-model="newOrderParams.blend" />
      Volume:
      <input type="text" v-model="newOrderParams.volume" />
      Date:
      <input type="text" v-model="newOrderParams.day" />
      ETA:
      <input type="text" v-model="newOrderParams.preferred_window" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>
