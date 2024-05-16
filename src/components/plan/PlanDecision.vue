<template>
  <ion-page>
    <ion-content>
      <div class="split-page-container">
        <div class="back-button-div">
          <back-button></back-button>
        </div>
        <div @click="toCreatePlans" class="split-page-item split-page-left">
          <p>Erstelle</p>
          <p class="split-page-subtext">deinen individuellen Plan</p>
        </div>
        <div class="split-page-circle">
          <p class="or-class">ODER</p>
        </div>
        <div @click="toPrePlans" class="split-page-item split-page-right">
          <p>Wähle</p>
          <p class="split-page-subtext">einen unserer Expertenpläne</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IonPage, IonContent } from "@ionic/vue";
import BackButton from "@/components/reusable/BackButton.vue";

const router = useRouter();

let routeID;
function toCreatePlans() {
  routeID = Math.floor(Math.random() * 1000);
  router.push({
    path: "/workoutplan/" + routeID + "/createPlanName",
  });
}
function toPrePlans() {
  router.push({
    path: "/prePlans",
  });
}
</script>

<style scoped>
.back-button-div {
  background-color: var(--ion-color-warning);
}
.split-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.split-page-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 100%;
  color: #fff;
  font-size: 2rem;
  text-transform: uppercase;
}

.split-page-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
  z-index: 1;
}

.or-class {
  color: var(--ion-color-light);
}

.split-page-circle p {
  margin: 0;
  font-size: 1.2rem;
  text-transform: none;
}

.split-page-right {
  background-color: var(--ion-color-medium);
  border-left: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.split-page-left {
  background-color: var(--ion-color-warning);
  border-right: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.split-page-subtext {
  font-size: 0.8rem;
  margin-top: 5px;
  opacity: 0.8;
}

p {
  font-weight: bold;
  margin: 0;
}
</style>
