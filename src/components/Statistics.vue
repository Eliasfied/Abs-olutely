<template>
  <ion-page>
    <the-footer title="Statistics"></the-footer>

    <ion-content color="tertiary" :fullscreen="true">
      <div class="grid-style">
        <div class="top-text">
          <ion-card class="top-card">
            
          </ion-card>
        </div>
        <div class="list-text">

        </div>
        <div class="top-list">
          <ul>
            <li v-for="item in list" :key="item.length">
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
                    <ion-icon size="large" color="success" :icon="play"></ion-icon>
                  </div>
                </div>
              </ion-card>
            </li>
          </ul>
        </div>
      </div> </ion-content
  ></ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage, IonCard, IonLabel, IonIcon } from "@ionic/vue";
import { timeOutline, play } from "ionicons/icons";
import TheFooter from "./reusable/TheFooter.vue";
import { ref } from "vue";
import { getStatisticsList } from "@/composables/getStatisticsList";

export default defineComponent({
  name: "CalendarPage",
  components: { IonContent, IonPage, TheFooter, IonCard, IonLabel, IonIcon },
  setup() {
    let list = ref();
    async function getData() {
      list.value = await getStatisticsList();
    }

    getData();

    console.log("list in statistics: ");
    console.log(list);

    return { list, timeOutline, play };
  },
});
</script>

<style scoped>
.grid-style {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 30% [row1-end] 5% [row2-start] 65% [row2-end];
}

.top-text {
  height: 100%;
  grid-row: row1-start / row1-end;
}

.top-card {
 padding: 5%;
}

.list-text {
  background-color: var(--ion-color-secondary);
  margin-right: 5%;
  margin-left: 5%;
  grid-row: row1-end / row2-start;

}

.top-list {
  grid-row: row2-start / row2-end;
  
}

ul {
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  height: 15%;
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
</style>
