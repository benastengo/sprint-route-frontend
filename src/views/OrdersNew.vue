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
  <div class="container-sm mt-3 mb-3 customers-new border border-3 p-4">
    <h1 class="lead"><strong>New Customer</strong></h1>
    <form v-on:submit.prevent="createCustomer()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="row mb-3">
        <label for="customerName" class="col-sm-2 col-form-label">Customer Name:</label>
        <div class="col-sm-10">
          <input type="string" class="form-control" id="customerName" v-model="newCustomerParams.name" />
        </div>
      </div>
      <div class="row mb-3">
        <label for="customerAddress" class="col-sm-2 col-form-label">Customer Address:</label>
        <div class="col-sm-10">
          <input type="string" class="form-control" id="customerAddress" v-model="newCustomerParams.address" />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  <div class="orders-new container-sm mt-3 mb-3 border border-3 p-4">
    <h1 class="lead"><strong>New Order</strong></h1>
    <form v-on:submit.prevent="createOrder()">
      <div class="row g-3">
        <div class="col-md-3">
          <label for="validationDefault04" class="form-label">Customer</label>
          <select v-model="newOrderParams.customer_id" class="form-select" id="validationDefault04" required>
            <option v-for="customer in customers" v-bind:key="customer.id" v-bind:value="customer.id">
              {{ customer.name }} || {{ customer.address }}
            </option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="validationDefault02" class="form-label">Blend</label>
          <input type="text" class="form-control" id="validationDefault02" v-model="newOrderParams.blend" required />
        </div>
        <div class="col-md-4">
          <label for="validationDefaultUsername" class="form-label">Volume</label>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              id="validationDefaultUsername"
              aria-describedby="inputGroupPrepend2"
              v-model="newOrderParams.volume"
              required
            />
          </div>
        </div>
        <div class="col-md-6">
          <label for="validationDefault03" class="form-label">Date</label>
          <input type="date" class="form-control" id="validationDefault03" v-model="newOrderParams.day" required />
        </div>

        <div class="col-md-3">
          <label for="validationDefault05" class="form-label">ETA</label>
          <input type="text" class="form-control" id="validationDefault05" v-model="newOrderParams.preferred_window" />
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit">Submit form</button>
        </div>
      </div>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </form>
  </div>
</template>
