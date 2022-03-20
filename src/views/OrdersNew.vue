<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newOrderParams: {},
      newCustomerParams: {},
      errors: [],
      customers: [],
      orders: [],
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
          console.log("orders create", response.data);
          this.$router.push(`/customers/${response.data.customer.id}`);
        })
        .catch((error) => {
          console.log("orders create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    createCustomer: function () {
      axios.post("/customers", this.newCustomerParams).then((response) => {
        console.log("Customers create", response.data);
        this.customers.push(response.data);
        this.newCustomerParams = {};
        this.$router.push(`/customers/${response.data.id}`);
      });
    },
  },
  default() {
    return false;
  },
};
</script>

<template>
  <div class="customers-new">
    <h1>New Customer</h1>
    <form v-on:submit.prevent="createCustomer()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Customer Name:
      <input type="stringr" v-model="newCustomerParams.name" />
      Customer Address:
      <input type="string" v-model="newCustomerParams.address" />
      <input type="submit" value="Create" />
    </form>
  </div>
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
