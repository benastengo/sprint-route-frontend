<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newOrderParams: {},
      errors: [],
      customers: [],
    };
  },
  created: function () {
    axios.get("/customers").then((response) => {
      console.log("customers index", response.data);
      this.customers = response.data;
    });
  },
  methods: {
    createOrder: function () {
      axios
        .post("/orders", this.newOrderParams)
        .then((response) => {
          console.log("orders create", response);
          this.$router.push("/customers/3");
        })
        .catch((error) => {
          console.log("orders create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
  default() {
    return false;
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
      Customer:
      <select v-model="newOrderParams.customer_id">
        <!-- inline object literal -->
        <option v-for="customer in customers" v-bind:key="customer.id" v-bind:value="customer.id">
          {{ customer.name }}
        </option>
      </select>
      Blend:
      <p>{{ newOrderParams }}</p>
      <input type="integer" v-model="newOrderParams.blend" />
      Volume:
      <input type="integer" v-model="newOrderParams.volume" />
      Date:
      <input type="date" v-model="newOrderParams.day" />
      Desired ETA:
      <input type="text" v-model="newOrderParams.preferred_window" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>
