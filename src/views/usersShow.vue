<script>
/* global bootstrap */
import axios from "axios";
export default {
  data: function () {
    return {
      user: { orders: [], info: {} },
      editOrderParams: {},
      userIds: [],
      isManager: localStorage.manager == "true",
      users: [],
      orders: [],
    };
  },
  created: function () {
    axios.get("/users/" + this.$route.params.id).then((response) => {
      console.log("User Show", response);
      this.user = response.data;
    });
    axios.get("/users").then((response) => {
      console.log("users index", response);
      this.users = response.data;
    });
    axios.get("/orders").then((response) => {
      console.log("Orders index", response);
      this.orders = response.data;
    });
  },
  methods: {
    showInfo: function () {
      document.querySelector("#info-details").showModal();
    },
    showLoadAssignment: function () {
      document.querySelector("#load-details").showModal();
    },

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
    updateInfo: function () {
      axios
        .patch(`/users/${this.user.id}`, this.user)
        .then((response) => {
          console.log("Success!", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    assignLoads: function () {
      axios
        .patch("/orders/assignment", { user_ids: this.userIds })
        .then((response) => {
          console.log("Assign Loads", response);

          bootstrap.Modal.getInstance(document.getElementById("assignLoadsModalLabel")).hide();
        })
        .catch((error) => {
          console.log("Error Assigning Loads", error.response);
        });
      this.$router.push(`/users/`, 2000);
    },
  },
};
</script>

<template>
  <div v-if="isManager">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#assignLoadsModal">
      Load Optimization
    </button>
  </div>
  <div class="home">
    <h1>{{ user.first_name + " " + user.last_name }}</h1>
    <h3 v-if="user.tractor_number">Tractor: {{ user.tractor_number }}</h3>
    <h3 v-if="user.trailer_number">Trailer: {{ user.trailer_number }}</h3>
    <h3>Driver Location: {{ user.location }}</h3>
    <button v-on:click="showInfo()">Edit Driver Info</button>
    <!-- Orders index for v2 -->
    <!-- <div v-for="order in orders" v-bind:key="order.id">
      <div v-if="isManager && order.user_id == null">
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item">{{ order.customer.name }}</li>
          <li class="list-group-item">{{ order.blend }}</li>
          <li class="list-group-item">{{ order.volume }}</li>
        </ul>
      </div>
    </div> -->
    <div v-for="order in orders" v-bind:key="order.id">
      <div v-if="isManager && order.user_id == null" class="list-group">
        <a class="list-group-item list-group-item-action active mb-2 mt-1">
          <div class="d-flex w-100 justify-content-between">
            <router-link class="color" :to="`/customers/${order.customer.id}`" tag="button">
              {{ order.customer.name }}
            </router-link>
            <small>{{ order.blend }} for {{ order.volume }} gallons</small>
          </div>
          <p class="mb-1">
            {{ order.customer.address }}
          </p>
          <small>{{ order.day }}</small>
        </a>
      </div>
    </div>
    <h3 v-if="user.orders.length > 0">Assigned Loads: {{ user.orders.length }}</h3>
    <br />
    <dialog id="info-details">
      <form method="dialog">
        <h2>Update Info</h2>
        <p>
          Tractor Number:
          <input type="integer" v-model="user.tractor_number" />
        </p>
        <p>
          Trailer Number:
          <input type="text" v-model="user.trailer_number" />
        </p>
        <p>
          Location:
          <input type="text" v-model="user.location" />
        </p>
        <button v-on:click="updateInfo()">Submit</button>
        <button>Close</button>
      </form>
    </dialog>
    <!-- <h3>Completed Loads: {{ user.orders.fulfilled.length }}</h3> -->
    <!-- <h3>Unfulfilled Loads: {{ user.orders.fulfilled.length }}</h3> -->
  </div>
  <h1 v-if="user.orders.length > 0">Todays Loads:</h1>
  <div v-for="order in user.orders" v-bind:key="order.id">
    <!-- <h2>Load Origin:</h2> -->
    <h2>Blend: {{ order.blend }}</h2>
    <h2>Volume (GAL): {{ order.volume }}</h2>
    <h2 v-if="order.preferred_window">ETA: {{ order.preferred_window }}</h2>
    <h2>
      Store:
      <router-link :to="`/customers/${order.customer.id}`" tag="button">{{ order.customer.name }}</router-link>
      - {{ order.customer.address }}
    </h2>
    <button v-if="isManager" v-on:click="showOrder(order)">Edit</button>
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

  <!-- Modal -->
  <div
    class="modal fade"
    id="assignLoadsModal"
    tabindex="-1"
    aria-labelledby="assignLoadsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content p-2">
        <div class="modal-header">
          <h5 class="modal-title" id="assignLoadsModalLabel">Choose Today's Drivers</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="form-check" v-for="user in users" v-bind:key="user.id">
          <input class="form-check-input" type="checkbox" :value="user.id" :id="user.id" v-model="userIds" />
          <label class="form-check-label" :for="user.id">{{ user.first_name }} {{ user.last_name }}</label>
        </div>
        <div class="modal-footer">
          <button
            id="loadOptimize"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            v-on:click="assignLoads()"
          >
            Optimize Loads
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.color {
  color: rgb(250, 250, 250);
}
</style>
