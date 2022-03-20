<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: { orders: [] },
      editOrderParams: {},
    };
  },
  created: function () {
    axios.get("/users/" + this.$route.params.id).then((response) => {
      console.log("User Show", response);
      this.user = response.data;
    });
  },
  methods: {
    showOrder: function (order) {
      console.log(order);
      this.currentOrder = order;
      this.editOrderParams = order;
      document.querySelector("#order-details").showModal();
    },
    destroyOrder: function (order) {
      if (confirm("Confirm Deletion")) {
        axios.delete(`/orders/${order.id}`).then((response) => {
          console.log("Success", response.data);
          var index = this.orders.indexOf(order);
          this.user.orders.splice(index, 1);
        });
      }
    },
    updateOrder: function (order) {
      axios
        .patch(`/orders/${order.id}`, order)
        .then((response) => {
          console.log("Success!", response.data);
          this.user.orders.push;
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
  },
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
    <br />
    <!-- <h3>Completed Loads: {{ user.orders.fulfilled.length }}</h3> -->
    <!-- <h3>Unfulfilled Loads: {{ user.orders.fulfilled.length }}</h3> -->
  </div>
  <h1>Todays Loads:</h1>
  <div v-for="order in user.orders" v-bind:key="order.id">
    <!-- <h2>Load Origin:</h2> -->
    <h2>Blend(s): {{ order.blend }}</h2>
    <h2>Volume (GAL): {{ order.volume }}</h2>
    <h2 v-if="order.preferred_window">ETA: {{ order.preferred_window }}</h2>
    <h2>
      Store:
      <router-link :to="`/customers/${order.customer.id}`" tag="button">{{ order.customer.name }}</router-link>
      - {{ order.customer.address }}
    </h2>
    <button v-on:click="showOrder(order)">Edit</button>
    <br />
    <h2>
      <dialog id="order-details">
        <form method="dialog">
          <h2>Update Order</h2>
          <p>
            Blend:
            <input type="text" v-model="editOrderParams.blend" />
          </p>
          <p>
            Volume:
            <input type="integer" v-model="editOrderParams.volume" />
          </p>
          <p>
            Date:
            <input type="date" v-model="editOrderParams.day" />
          </p>
          <p>
            ETA:
            <input type="text" v-model="editOrderParams.preferred_window" />
          </p>
          <button v-on:click="updateOrder(currentOrder)">Update</button>
          <button v-on:click="destroyOrder(currentOrder)">Destroy</button>
          <button>Close</button>
        </form>
      </dialog>
    </h2>
  </div>
</template>

<style></style>
