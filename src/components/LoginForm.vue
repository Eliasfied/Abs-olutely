<template>
  <form @submit.prevent="submitForm">
    <input v-model="email" type="text" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Log in</button>
  </form>
  <p></p>
  <button @click="gitHubLogin">login with github</button>
  <p></p>
  <button @click="goToRegister">Register</button>
</template>

<script lang="ts">
import { ref, SetupContext } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup(props: any, context: SetupContext) {
    const email = ref("");
    const password = ref("");

    const router = useRouter();

    async function submitForm() {
      try {
        const response = await axios.post("http://localhost:7070/login", {
          email: email.value,
          password: password.value,
        });

        if (response.status === 200) {
          console.log(response.data);
          context.emit("login-success", response.data);
        } else {
          console.error("Login failed with status: ", response.status);
        }
      } catch (error) {
        console.error("An error occurred during login: ", error);
      }
    }

    function goToRegister() {
      router.push("/register");
    }

    async function gitHubLogin() {
      window.location.href =
        "https://github.com/login/oauth/authorize?client_id=0216de7e100fe4a5e1ef&redirect_uri=http://localhost:7070/github";
    }

    return {
      email,
      password,
      submitForm,
      goToRegister,
      gitHubLogin,
    };
  },
};
</script>
