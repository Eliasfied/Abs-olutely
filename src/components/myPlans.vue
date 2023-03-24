<template>
  <ion-page>
    <the-footer title="myPlans"> </the-footer>
    <ion-content>
      <div class="list-container">
        <ion-card class="plan-card" v-for="plan in plans" :key="plan" @click="goToPlanPreview(plan.planName)">
          <ion-card-content>
            <ion-label>
              {{ plan.planName }}
            </ion-label>
          </ion-card-content>
        </ion-card>
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
    IonCard,
    IonLabel,
  },
  setup() {
    const router = useRouter();
    const plans:any = ref([]);

    async function loadStore() {
      const store = useMyPlanStore();
      await store.loadPlansFromStore();
      plans.value = store.planList;
    }

    function goToPlanPreview(planName: string) {
      router.push("/planPreview/" + planName);
    }

    loadStore();

    return {
      plans,
      goToPlanPreview,
    };
  },
});
</script>
<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plan-card {
  width: 90%;
  margin-bottom: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.plan-card ion-card-content {
  display: flex;
  justify-content: center;
}

.plan-card ion-label {
  font-size: 18px;
  font-weight: 500;
  color: #333333;
}
</style>