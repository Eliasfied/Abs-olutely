<template>
  <ion-page>
    <the-footer title="myPlans"> </the-footer>
    <ion-content>
      <div>
        <ul>
          <li v-for="plan in plans" :key="plan">
            {{ plan }}
          </li>
        </ul>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonContent,
  IonCard,
  IonIcon,
  IonFooter,
  IonLabel,
} from "@ionic/vue";
import { ref, watch } from "vue";
import planStorage from "../storage/myPlanStorage";
import { useMyPlanStore } from "../store/myPlans";
import TheFooter from "../components/reusable/TheFooter.vue";

export default defineComponent({
  name: "myPlans",
  components: {
    IonPage,
    IonContent,
    TheFooter,
  },
  setup() {
    let plans: any = ref([]);

    async function loadStore() {
      const store = useMyPlanStore();
      await store.loadWorkoutsFromStore();
      plans.value = store.planList;
    }
    loadStore();
    console.log("plans final: ");
    console.log(plans);

    return {
      plans,
    };
  },
});
</script>
