<template>
  <ion-page>
    <ion-content color="secondary" :fullscreen="true">
      <the-footer title="My Workouts"></the-footer>
      <div class="grid-style-workouts">
        <div class="add-workout">
          <router-link class="routerLink" to="/myworkouts/editor/new">
            <ion-button color="danger"
              ><ion-icon
                slot="start"
                color="tertiary"
                :icon="addCircle"
              ></ion-icon
              >Add Workout</ion-button
            >
          </router-link>
        </div>
        <div class="workout-list">
          <ul>
            <li v-for="(workout, index) in workouts" :key="workout.name">
              <ion-card
                ><ion-card-content class="ion-card-content">
                  <div class="grid-style-li">
                    <div class="icon-clipboard">
                      <ion-icon :icon="clipboard"></ion-icon>
                    </div>
                    <div class="label-workoutname">
                      <ion-label>{{ workout.name }}</ion-label>
                    </div>
                    <div class="icon-edit">
                      <router-link
                        :to="'/myworkouts/editor/' + workouts[index].name"
                        ><ion-icon :icon="create"></ion-icon
                      ></router-link>
                    </div>
                    <div class="icon-trash">
                      <ion-icon
                        class="icon-color-trash"
                        :icon="trash"
                      ></ion-icon>
                    </div>
                  </div> </ion-card-content
              ></ion-card>
            </li>
          </ul>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheFooter from "../components/TheFooter.vue";
import { IonPage, IonContent, IonCard, IonCardContent } from "@ionic/vue";
import {
  addCircle,
  clipboardOutline,
  create,
  trash,
  clipboard,
} from "ionicons/icons";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import { ref } from "vue";
export default defineComponent({
  name: "MyWorkouts",
  components: { TheFooter, IonPage, IonContent, IonCard, IonCardContent },
  setup() {
    // STORE DATA
    let workouts = ref();
    async function loadStore() {
      const store = useMyWorkoutsStore();
      await store.loadWorkoutsFromStore();
      workouts.value = store.workoutList;
      console.log("hier ist die workoutListe: ");
      console.log(workouts);
    }
    loadStore();
    console.log("workouts final: ");
    console.log(workouts);

    return { addCircle, clipboardOutline, create, trash, clipboard, workouts };
  },
});
</script>

<style scoped>
.grid-style-workouts {
  display: grid;
  height: 90%;
  grid-template-rows: [row1-start] 10% [row1-end] 90% [row2-start];
}

.grid-style-li {
  display: grid;
  height: 100%;
  grid-template-columns: [colmumn1-start] 10% [column1-end] 70% [column2-start] 10% [column2-end] 10% [column3-start];
}

ion-button {
  width: 100%;
}

ion-icon {
  font-size: 20px;
}

li {
  width: 100%;
}

ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

ion-card {
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.add-workout {
  width: 100%;
  grid-row: row1-start / row1-end;
  justify-self: center;
  align-self: center;
}

.workout-list {
  width: 100%;
  grid-row: row1-end / row2-start;
}

.ion-card-content {
  color: var(--ion-color-primary);
  font-size: medium;
  font-weight: bold;
}

.routerLink {
  height: 100%;
}

.icon-clipboard {
  align-self: center;
}
.label-workoutname {
  align-self: center;
}

.icon-edit {
}

.icon-trash {
  justify-self: end;
  align-self: center;
}

.icon-color-trash {
  color: red;
}
</style>
