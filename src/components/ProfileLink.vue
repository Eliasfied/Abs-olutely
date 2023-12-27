<template>
  <ion-page>
    <the-footer title="Profil"></the-footer>
    <ion-content>
      <login-form v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
      <profile-page v-else @logout="logoutEvent" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { ref, onMounted, watch } from "vue";
import TheFooter from "./reusable/TheFooter.vue";
import LoginForm from "./LoginForm.vue";
import ProfilePage from "./ProfilePage.vue";
import axios from "axios";
import { useTokenValidation } from "@/composables/UseTokenValidation";
import { loginStore } from "@/store/loginStore";

const store = loginStore();
const isLoggedIn = ref(false);

onMounted(async () => {
  console.log("bin in onMounted drin");
  await store.checkLoginStatus();
  console.log("store.isLoggedIn: ", store.isLoggedIn);
  isLoggedIn.value = store.isLoggedIn;
});

function handleLoginSuccess(jwt) {
  console.log("Login successful with JWT: ", jwt);
  localStorage.setItem("jwt", jwt);
  store.isLoggedIn = true;
  isLoggedIn.value = store.isLoggedIn;
  console.log("store.isLoggedIn in handleLoginSuccess: ", store.isLoggedIn);
}

function logoutEvent() {
  store.isLoggedIn = false;
  isLoggedIn.value = store.isLoggedIn;
}

watch(
  () => store.isLoggedIn,
  (newIsLoggedIn) => {
    isLoggedIn.value = newIsLoggedIn;
  }
);
</script>
