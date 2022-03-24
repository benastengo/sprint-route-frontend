<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
      isLoggedIn: !!localStorage.jwt,
      user_id: localStorage.user_id,
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("manager", response.data.manager);
          localStorage.setItem("flashMessage", "Successfully logged in!");
          this.$router.push(`/users/${response.data.user_id}`);
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
  created: function () {
    if (this.isLoggedIn) {
      this.$router.push(`/users/${this.user_id}`);
    }
  },
};
</script>

<template>
  <div class="login">
    <form>
      <div class="login-form container">
        <form v-on:submit.prevent="submit()">
          <h2 class="text-center">SprintRoute</h2>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              v-model="newSessionParams.email"
              required="required"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="newSessionParams.password"
              required="required"
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Log in</button>
          </div>
        </form>
      </div>
    </form>
  </div>
</template>

<style>
.login-form {
  width: 340px;
  margin: 50px auto;
  font-size: 15px;
}
.login-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control,
.btn {
  min-height: 38px;
  border-radius: 2px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}
</style>
