<script>
import axios from "axios";
export default {
  data: function () {
    return {
      orders: [],
      order: {},
      customer: {},
      currentOrder: {},
      editOrderParams: {},
      newOrder: {},
      newOrderParams: {},
    };
  },
  created: function () {
    axios.get("/customers/" + this.$route.params.id).then((response) => {
      console.log("customers show", response);
      this.customer = response.data;
      this.newOrderParams.customer_id = this.customer.id;
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
        .patch(`/orders/${order.id}`, order)
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
          this.customer.orders.splice(index, 1);
        });
      }
    },
    showNewOrder: function () {
      console.log();
      document.querySelector("#newOrder-details").showModal();
    },
    createOrder: function () {
      axios
        .post("/orders/", this.newOrderParams)
        .then((response) => {
          console.log("Success!", response.data);
          this.customer.orders.push(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
  },
};
</script>

<template>
  <div class="customers-show">
    <h2>{{ customer.name }}</h2>
    <h2>Address: {{ customer.address }}</h2>

    <h2>
      <button v-on:click="showNewOrder()">Create Order:</button>
      <dialog id="newOrder-details">
        <form method="dialog">
          <h2>New Order for {{ customer.name }}</h2>

          <p>
            Blend:
            <input type="text" v-model="newOrderParams.blend" />
          </p>
          <p>
            Volume:
            <input type="integer" v-model="newOrderParams.volume" />
          </p>
          <p>
            Date:
            <input type="date" v-model="newOrderParams.day" />
          </p>
          <p>
            ETA:
            <input type="text" v-model="newOrderParams.preferred_window" />
          </p>
          <button v-on:click="createOrder(newOrder)">Create</button>
          <button>Close</button>
        </form>
      </dialog>
    </h2>
    <h3>Orders:</h3>
    <h2 v-for="order in customer.orders" v-bind:key="order.id">
      <h3>
        Blend: {{ order.blend }} || volume: {{ order.volume }} GAL || date: {{ order.day }} || Completed:
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
        <p>
          Volume:
          <input type="text" v-model="editOrderParams.volume" />
        </p>
        <p>
          Date:
          <input type="text" v-model="editOrderParams.day" />
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
  </div>
</template>
