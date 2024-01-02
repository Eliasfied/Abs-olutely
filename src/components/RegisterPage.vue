<template>
  <ion-page>
    <ion-content>
      <form @submit.prevent="register">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />

        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />

        <button type="submit">Register</button>
      </form>
      <p>
        {{ responseMessage }}
      </p>
      <div>
        <p v-if="!isUserCreated">Already have an account?</p>
        <p v-else>Login now:</p>
        <router-link to="/profile">Log in</router-link>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const password = ref("");

const isUserCreated = ref(false);

const responseMessage = ref("");

async function register() {
  try {
    const response = await axios.post("http://localhost:7070/register", {
      email: email.value,
      password: password.value,
    });
    responseMessage.value = response.data;
    if (response.status === 200) {
      isUserCreated.value = true;
      email.value = "";
      password.value = "";
    } else {
      console.error("Registration failed with status: ", response.status);
      email.value = "";
      password.value = "";
    }
  } catch (error) {
    console.error("An error occurred during registration: ", error);
    responseMessage.value = "An error occurred during registration.";
    email.value = "";
    password.value = "";
  }
}
</script>
