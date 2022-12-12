<template>
  <ion-page>
    <the-footer title="Statistics"></the-footer>

    <ion-content color="tertiary" :fullscreen="true">
      <div class="grid-style">
        <div class="top-text">
          <ion-card>
            <div class="list-div-grid">
              <div class="list-div">
                <ion-list>
                  <ion-item>
                    <ion-icon
                      color="success"
                      slot="start"
                      :icon="flagOutline"
                    ></ion-icon>
                    <p>Finished Workouts: {{ list.length }}</p>
                  </ion-item>
                  <ion-item>
                    <ion-icon
                      color="danger"
                      slot="start"
                      :icon="stopwatchOutline"
                    ></ion-icon>
                    <p>Overall Workout-Time: {{ totalTime }} Min.</p>
                  </ion-item>
                  <ion-item>
                    <ion-icon
                      :style="{ color: 'purple' }"
                      slot="start"
                      :icon="hourglassOutline"
                    ></ion-icon>
                    <p>Average Workout-Time: {{ averageTime }} Min.</p>
                  </ion-item>
                </ion-list>
              </div>
            </div>
          </ion-card>
        </div>
        <div class="list-text">
          <ion-label class="text-label"> Recent Workouts...</ion-label>
        </div>
        <div class="top-list">
          <ul>
            <li v-for="(item, index) in list" :key="item.index">
              <ion-card>
                <div class="grid-style-li">
                  <div class="workout-name">
                    <ion-label>{{ item.workoutname }}</ion-label>
                  </div>
                  <div class="workout-time">
                    <ion-icon class="style-time" :icon="timeOutline"></ion-icon>
                    <ion-label class="style-label"
                      >{{ item.minutes }} Min.</ion-label
                    >
                  </div>
                  <div class="workout-date">
                    <ion-label color="danger">{{ item.date }}</ion-label>
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
          <v-calendar :attributes="attrs" is-expanded> </v-calendar>
        </div>
      </div> </ion-content
  ></ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonContent,
  IonPage,
  IonCard,
  IonLabel,
  IonIcon,
  IonList,
  IonItem,
} from "@ionic/vue";
import {
  timeOutline,
  play,
  flagOutline,
  ribbonOutline,
  stopwatchOutline,
  hourglassOutline,
} from "ionicons/icons";
import TheFooter from "./reusable/TheFooter.vue";
import { ref, computed, reactive } from "vue";
import { getStatisticsList } from "@/composables/getStatisticsList";
import { useRouter } from "vue-router";
import { useWorkoutsStore } from "../store/workouts";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import { useStatisticsStore } from "../store/statisticsStore";

export default defineComponent({
  name: "CalendarPage",
  components: {
    IonContent,
    IonPage,
    TheFooter,
    IonCard,
    IonLabel,
    IonIcon,
    IonList,
    IonItem,
  },
  setup() {
    //fill store

    const statsStore = useStatisticsStore();

    //router
    let router = useRouter();

    //CALENDAR
    let attrs: any = ref([]);

    //data
    let list: any = ref([]);
    let totalTime = ref();
    let averageTime = ref();
    let id = 445;

    //initialisieren und aus Storage laden
    async function getData() {
      await statsStore.loadStatisticsFromStore();
      list.value = statsStore.statisticsList;
      list.value.reverse();
      totalTime.value = computed(() => {
        let total = 0;
        for (var i = 0; i < list.value.length; i++) {
          total = total + list.value[i].minutes;
        }
        return total;
      });
      averageTime.value = computed(() => {
        let total = 0;
        for (var i = 0; i < list.value.length; i++) {
          total = total + list.value[i].minutes;
        }
        return Math.round(total / list.value.length);
      });

      attrs.value = list.value.map((item) => ({
        key: id++,
        highlight: {
          color: "blue",
          fillMode: "solid",
          contentClass: "italic",
        },
        dates: [item.calendarDate],
        popover: {
          label: item.workoutname,
        },
      }));
    }

    getData();

    function goToWorkout(item, index) {
      console.log("lets go");
      console.log(item);
      console.log(index);
      router.push("/preview/" + item.workoutname);
    }

    return {
      list,
      timeOutline,
      play,
      flagOutline,
      ribbonOutline,
      stopwatchOutline,
      hourglassOutline,
      totalTime,
      averageTime,
      attrs,
      goToWorkout,
    };
  },
});
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
}

.list-text {
  background-color: var(--ion-color-tertiary);
  border-radius: 40px;
  grid-row: row1-end / row2-start;
  align-self: center;
  justify-self: center;
}

.top-list {
  grid-row: row2-start / row2-end;
}

.top-card-grid {
  height: 100%;
}

.list-div-grid {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 100% [row1-end];
}

.list-div {
  align-self: center;
}

ul {
  height: 90%;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

li {
  height: 30%;
}

ion-card {
  height: 100%;
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
  color: gray;
}

.calendar-div {
  padding: 5px;
  grid-row: row2-end / row3-start;
}
</style>
