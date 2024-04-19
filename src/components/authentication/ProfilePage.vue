<template>
  <ion-page>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Information</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Username: {{ userName }}</p>
          <p>Email: {{ userEmail }}</p>
          <p>Id: {{ userId }}</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
//imports
import { loginStore } from "@/store/authentication/loginStore";

//user
const logStore = loginStore();
const userName = logStore.displayName;
const userEmail = logStore.email;
const userId = logStore.userId;
</script>

<style scoped>
ion-content {
  --background: url("../../assets/profile/profile-background.png") no-repeat center center / cover;

}

ion-card {
  background-image: url("../../assets/profile/profile-card.png");
  background-size: cover;
  background-position: center;
}

p {
  font-weight: bold;
}
</style>
