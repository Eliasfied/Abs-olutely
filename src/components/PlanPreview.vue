<template>
  <ion-page>
    <the-footer title="Planpreview"> </the-footer>
    <ion-content>
      <div class="grid-page">
        <div class="weeks-div">
          <ul class="week-list">
            <li
              class="week-listitem"
              v-for="(week, index) in weekArray"
              :key="week"
            >
              <ion-card 
                :class="{ 'selected-card': index === selectedCardIndex }" 
                @click="changeWeek(index)"
              >
                {{ week.name }}
              </ion-card>
            </li>
          </ul>
        </div>
        <div class="days-div">
          <ul>
            <li v-for="day in selectedWeek" :key="day">
              <ion-card>
                {{ day.day }} {{ weekArray[weekIndex].workout }}
              </ion-card>
            </li>
          </ul>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
import { useMyPlanStore } from "../store/myPlans";
import { computed, ref } from "vue";
import TheFooter from "../components/reusable/TheFooter.vue";


export default defineComponent({
  name: "WorkoutPlan",
  components: { IonContent, IonPage, TheFooter },
  setup() {
    let planStore = useMyPlanStore();
    let selectedDay = ref(1);
    let weekIndex = ref(0);
    let selectedCardIndex = ref(0);

    let weekArray = planStore.weekArray;

    let selectedWeek = computed(() => {
      return weekArray[selectedDay.value].array;
    });

    function changeWeek(index) {
      selectedCardIndex.value = index;
      weekIndex.value = index;
      selectedDay.value = index;
    }

    return { weekArray, selectedDay, selectedWeek, changeWeek, weekIndex, selectedCardIndex };
  },
});
</script>
<style scoped>
.week-list {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.week-listitem {
  display: inline-block;
}

.selected-card {
  background-color: green;
}
</style>