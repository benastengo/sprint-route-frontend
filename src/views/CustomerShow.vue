<script>
import axios from "axios";
export default {
  data: function () {
    return {
      order: {},
      customer: {},
      currentOrder: {},
      editOrderParams: {},
    };
  },
  created: function () {
    axios.get("/customers/" + this.$route.params.id).then((response) => {
      console.log("customers show", response);
      this.customer = response.data;
    });
  },
  methods: {
    showOrder: function (order) {
      console.log(order);
      this.currentOrder = order;
      this.editOrderParams = order;
      document.querySelector("#order-details").showModal();
    },
    updateOrder: function (order) {
      axios
        .post(`/orders/${order.id}`, order)
        .then((response) => {
          console.log("Success!", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    destroyOrder: function (order) {
      if (confirm("Confirm Deletion")) {
        axios.delete(`/orders/${order.id}`).then((response) => {
          console.log("Success", response.data);
          var index = this.orders.indexOf(order);
          this.orders.splice(index, 1);
        });
      }
    },
  },
};
</script>

<template>
  <div class="customers-show">
    <h2>{{ customer.name }}</h2>
    <h2>Address: {{ customer.address }}</h2>
    <h3>Orders:</h3>
    <h2 v-for="order in customer.orders" v-bind:key="order.id">
      <h3>
        Blend: {{ order.blend }}, volume: {{ order.volume }} GL, date: {{ order.day }}, Completed:
        {{ order.fulfilled }}
      </h3>
      <button v-on:click="showOrder(order)">Edit</button>
    </h2>
    <dialog id="order-details">
      <form method="dialog">
        <h2>Update Order</h2>
        <p>
          Blend:
          <input type="text" v-model="editOrderParams.blend" />
        </p>
        <button v-on:click="updateOrder(currentOrder)">Update</button>
        <button v-on:click="destroyOrder(currentOrder)">Destroy</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>
