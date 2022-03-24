<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          (this.newUserParams = {}), this.$router.push(`/users/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="container border border-5 p-4">
    <form v-on:submit.prevent="submit()">
      <div class="center p-2">
        <h1><strong>Driver Sign-up</strong></h1>
      </div>
      <div class="form-group">
        <label for="newDriverFirstName">First Name</label>
        <input type="text" class="form-control" id="newDriverFirstName" v-model="newUserParams.first_name" />
      </div>
      <div class="form-group">
        <label for="newDriverLastName">Last Name</label>
        <input type="text" class="form-control" id="newDriverLastName" v-model="newUserParams.last_name" />
      </div>
      <div class="form-group">
        <label for="newDriverEmail">Email</label>
        <input type="text" class="form-control" id="newDriverEmail" v-model="newUserParams.email" />
      </div>
      <div class="form-group">
        <label for="newDriverTractor">Tractor Number</label>
        <input type="integer" class="form-control" id="newDriverTractor" v-model="newUserParams.tractor_number" />
      </div>
      <div class="form-group">
        <label for="newDriverTrailer">Trailer Number</label>
        <input type="integer" class="form-control" id="newDriverTrailer" v-model="newUserParams.trailer_number" />
      </div>
      <div class="form-group">
        <label for="newDriverInputManager">Manager</label>
        <input type="boolean" class="form-control" id="newDriverInputManager" v-model="newUserParams.manager" />
      </div>
      <div class="form-group">
        <label for="newDriverInputLocation">Location</label>
        <input type="text" class="form-control" id="newDriverInputLocation" v-model="newUserParams.location" />
      </div>
      <div class="form-group">
        <label for="newDriverInputPassword1">Password</label>
        <input type="password" class="form-control" id="newDriverInputPassword1" v-model="newUserParams.password" />
      </div>
      <div class="form-group">
        <label for="newDriverConfirmPass">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="newDriverConfirmPass"
          v-model="newUserParams.password_confirmation"
        />
      </div>
      <button type="submit" class="btn btn-primary mt-4">Submit</button>
    </form>
  </div>
</template>
