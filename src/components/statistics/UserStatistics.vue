<template>
  <ion-page>
    <the-footer title="Statistiken"></the-footer>

    <ion-content color="tertiary" :fullscreen="true">
      <div class="grid-style">
        <div class="top-text">
          <ion-card>
            <div class="trackedWorkouts-div-grid">
              <div class="trackedWorkouts-div">
                <ion-trackedWorkouts>
                  <ion-item>
                    <ion-icon
                      color="success"
                      slot="start"
                      :icon="flagOutline"
                    ></ion-icon>
                    <p v-if="trackedWorkouts">
                      Abgeschlossene Workouts: {{ trackedWorkouts.length }}
                    </p>
                  </ion-item>
                  <ion-item>
                    <ion-icon
                      color="danger"
                      slot="start"
                      :icon="stopwatchOutline"
                    ></ion-icon>
                    <p>Insgesamte Workoutzeit: {{ totalTime }} Min.</p>
                  </ion-item>
                  <ion-item>
                    <ion-icon
                      :style="{ color: 'purple' }"
                      slot="start"
                      :icon="hourglassOutline"
                    ></ion-icon>
                    <p>Durchschnittliche Workoutzeit: {{ averageTime }} Min.</p>
                  </ion-item>
                </ion-trackedWorkouts>
              </div>
            </div>
          </ion-card>
        </div>
        <div class="trackedWorkouts-text">
          <ion-label class="text-label"> letzte Workouts...</ion-label>
        </div>
        <div class="top-trackedWorkouts">
          <ul>
            <li v-for="(item, index) in trackedWorkouts" :key="item.workoutId">
              <ion-card color="medium">
                <div class="grid-style-li">
                  <div class="workout-name">
                    <ion-label color="secondary">{{
                      item.workoutName
                    }}</ion-label>
                  </div>
                  <div class="workout-time">
                    <ion-icon
                      color="secondary"
                      class="style-time"
                      :icon="timeOutline"
                    ></ion-icon>
                    <ion-label class="style-label"
                      >{{ item.workoutTime }} Min.</ion-label
                    >
                  </div>
                  <div class="workout-date">
                    <ion-label color="danger">{{
                      formatDate(item.date.toString())
                    }}</ion-label>
                  </div>
                  <div class="workout-start">
                    <ion-icon
                      @click="goToWorkout(item, index)"
                      size="large"
                      color="success"
                      :icon="play"
                    ></ion-icon>
                  </div>
                </div>
              </ion-card>
            </li>
          </ul>
        </div>
        <div class="calendar-div">
          <v-calendar :attributes="attrs" expanded> </v-calendar>
        </div>
      </div> </ion-content
  ></ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonCard,
  IonLabel,
  IonIcon,
  IonItem,
} from "@ionic/vue";
import {
  timeOutline,
  play,
  flagOutline,
  stopwatchOutline,
  hourglassOutline,
} from "ionicons/icons";
import TheFooter from "@/components/reusable/TheFooter.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStatisticsStore } from "@/store/statisticsStore";
import { formatDate } from "@/composables/formatDate";
import { loginStore } from "@/store/authentication/loginStore";
import { UserStatistic } from "@/models/userStatistic/UserStatistic";
import { WorkoutStatistic } from "@/models/userStatistic/WorkoutStatistic";

//fill store

const statsStore = useStatisticsStore();

//router
let router = useRouter();

onMounted(async () => {
  await getData();
});

//CALENDAR
let attrs: any = ref([]);

//data
let trackedWorkouts = ref<WorkoutStatistic[]>([]);
let totalTime = ref();
let averageTime = ref();
let id = 445;

let userStatistic = ref<UserStatistic | null>(null);

//let userStatistic = ref()

const logStore = loginStore();
const userId = logStore.getUserId();

//initialisieren und aus Storage laden
async function getData() {
  await statsStore.loadStatisticsInStoreFromDB(userId as string);
  userStatistic.value = statsStore.getUserStatistic;
  trackedWorkouts.value = userStatistic.value
    .workoutStatistics as WorkoutStatistic[];
  console.log(userStatistic.value);
  console.log(trackedWorkouts.value);
  if (trackedWorkouts.value != null) {
    trackedWorkouts.value.reverse();
  }
  totalTime.value = computed(() => {
    if (trackedWorkouts.value == null) return 0;
    let total = 0;
    for (var i = 0; i < trackedWorkouts.value.length; i++) {
      total = total + trackedWorkouts.value[i].workoutTime;
    }
    return total;
  });
  averageTime.value = computed(() => {
    if (trackedWorkouts.value == null) return 0;
    let total = 0;
    for (var i = 0; i < trackedWorkouts.value.length; i++) {
      total = total + trackedWorkouts.value[i].workoutTime;
    }
    return Math.round(total / trackedWorkouts.value.length);
  });

  if (trackedWorkouts.value != null) {
    attrs.value = trackedWorkouts.value.map((item) => ({
      key: id++,
      highlight: {
        color: "blue",
        fillMode: "solid",
        contentClass: "italic",
      },
      dates: [item.date],
      popover: {
        label: item.workoutName,
      },
    }));
  }
}

function goToWorkout(item, index) {
  router.push("/preview/" + item.workoutId);
}
</script>

<style scoped>
.grid-style {
  height: 99%;
  display: grid;
  grid-template-rows: [row1-start] 25% [row1-end] 5% [row2-start] 35% [row2-end] 35% [row3-start];
}

.top-text {
  height: 90%;
  grid-row: row1-start / row1-end;
}

.text-label {
  color: var(--ion-color-primary);
  font-weight: bold;
}

.trackedWorkouts-text {
  background-color: var(--ion-color-tertiary);
  border-radius: 40px;
  grid-row: row1-end / row2-start;
  align-self: center;
  justify-self: center;
}

.top-trackedWorkouts {
  grid-row: row2-start / row2-end;
}

.top-card-grid {
  height: 100%;
}

.trackedWorkouts-div-grid {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 100% [row1-end];
}

.trackedWorkouts-div {
  align-self: center;
}

ul {
  height: 90%;
  trackedworkouts-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

li {
  height: 30%;
}

ion-card {
  height: 100%;
  color: var(--ion-color-medium);
}

.grid-style-li {
  display: grid;
  height: 100%;
  grid-template-rows: [row1-start] 50% [row1-end] 50% [row2-start];
  grid-template-columns: [column1-start] 50% [column1-end] 50% [column2-start];
}

.workout-name {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: start;
  padding: 5%;
  color: var(--ion-color-primary);
  font-weight: bold;
  font-size: larger;
}

.workout-time {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column1-end;
  align-self: start;
  justify-self: start;
  padding: 5%;
}

.workout-date {
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column2-start;
  align-self: center;
  justify-self: center;
  padding: 5%;
}

.workout-start {
  grid-row: row1-end / row2-start;
  grid-column: column1-end / column2-start;
  align-self: center;
  justify-self: center;
}

.style-time {
  margin-right: 5px;
  vertical-align: middle;
  color: gray;
}

.style-label {
  vertical-align: middle;
  color: white;
}

.calendar-div {
  padding: 5px;
  grid-row: row2-end / row3-start;
}
</style>
