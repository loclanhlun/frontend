<template>
  <div class="col-6 offset-3 pt-5">
    <div class="font-weight-bold display-4 text-center pb-4">LOGIN PAGE</div>
    <div class="d-flex">
      <b-col lg="8" style="margin: 0 auto">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your Name:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              type="password"
              v-model="form.password"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>
          <div class="row p-2">
              <b-button block class="m-2" type="submit" variant="outline-primary"
                >Login</b-button>
              <b-button block class="m-2" type="reset" variant="danger">Reset</b-button>
          </div>
        </b-form>
      </b-col>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Toasted from "vue-toasted";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let email = this.form.email;
      let password = this.form.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/admin"))
        .catch((err) => {
          alert("Email hoặc mật khẩu không đúng!");
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>