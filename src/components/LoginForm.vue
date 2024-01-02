<template>
  <form @submit.prevent="submitForm">
    <input v-model="username" type="text" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Log in</button>
  </form>
  <button @click="goToRegister">Register</button>
</template>

<script lang="ts">
import { ref, SetupContext } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup(props: any, context: SetupContext) {
    const username = ref("");
    const password = ref("");

    const router = useRouter();

    async function submitForm() {
      try {
        const response = await axios.post("http://localhost:7070/login", {
          username: username.value,
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

    return {
      username,
      password,
      submitForm,
      goToRegister,
    };
  },
};
</script>
