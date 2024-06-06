<template>
  <ion-page>
    <TheFooter title="Shared Items" />
    <ion-content color="tertiary">
      <ion-card v-for="(sharedItem, index) in sharedItems" :key="index">
        <ion-card-content class="sharedItem-card">
          <div class="sharedItem-header">
            <ion-avatar>
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </ion-avatar>
            <div class="notification-content card-content-right-margin">
              <p class="notification-text">
                {{ sharedItem.senderName }} hat {{ sharedItem.workoutName }} mit
                dir geteilt
              </p>
            </div>
            <ion-buttons>
              <ion-button @click="accept(sharedItem)">
                <ion-icon :icon="checkmarkOutline"></ion-icon>
              </ion-button>
              <ion-button @click="reject(sharedItem)">
                <ion-icon :icon="closeOutline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
//imports

import { checkmarkOutline, closeOutline } from "ionicons/icons";
import { SharedItem } from "@/models/sharedItems/SharedItem";
import { ref, onMounted } from "vue";
import { getPendingSharedWorkouts } from "@/services/PendingSharedWorkoutService";
import { deletePendingSharedWorkout } from "@/services/PendingSharedWorkoutService";
import { loginStore } from "@/store/authentication/loginStore";
import { getWorkoutById } from "@/services/workoutsService";
import { addWorkout } from "@/services/workoutsService";
import { Workout } from "@/models/Workout";
import TheFooter from "../reusable/TheFooter.vue";
import { synchronizeWorkouts } from "@/services/workoutsService";
import { useMyWorkoutsStore } from "@/store/myWorkouts";

//store
const workoutsStore = useMyWorkoutsStore();
const workouts = workoutsStore.workoutList;
const logStore = loginStore();
const userId = logStore.getUserId() as string;

const sharedItems = ref<SharedItem[]>([]);

onMounted(async () => {
  var response = await getPendingSharedWorkouts(userId);
  sharedItems.value = response.data;
  console.log("sharedItems.value");
  console.log(sharedItems.value);
});


//dynamischer noch gesalten nicht für "nur workout"
const accept = async (sharedItem: SharedItem) => {
  let workout = {} as Workout;
  var response = await getWorkoutById(sharedItem.workoutId);
  workout = response.data;
  workout.userId = userId;
  console.log("workout to add");
  console.log(workout);
  await addWorkout(workout);
  console.log("workouts");
  console.log(workouts);
  await synchronizeWorkouts(workouts, userId as string);
  await deletePendingSharedWorkout(sharedItem.workoutId, userId);
  sharedItems.value = sharedItems.value.filter(
    (item: SharedItem) => item.id !== sharedItem.id
  );
};

const reject = async (sharedItem: SharedItem) => {
  await deletePendingSharedWorkout(sharedItem.workoutId, userId);
  sharedItems.value = sharedItems.value.filter(
    (item: SharedItem) => item.id !== sharedItem.id
  );
};
</script>

<style scoped>
.sharedItem-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.sharedItem-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.notification-content {
  margin-left: 10px;
}

.card-content-right-margin {
  margin-right: 10px;
}

.notification-text {
  font-size: 16px;
  color: #000;
}

ion-avatar {
  margin-right: 10px;
}

ion-buttons {
  display: flex;
  flex-direction: row;
}

ion-button {
  margin-left: 10px;
}
</style>
