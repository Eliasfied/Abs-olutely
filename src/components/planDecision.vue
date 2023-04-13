<template>
  <ion-page>
    <ion-content>
      <div class="grid-page">
        <div class="headline-div">
          <p>Pick a plan or create your own plan</p>
        </div>
        <div class="pick-plan">
          <ion-card class="pick-card" @click="toPrePlans">
            <ion-card-content class="card-content">
              <ion-label class="center-label">pick</ion-label>
            </ion-card-content>
          </ion-card>
        </div>
        <div class="create-plan">
          <ion-card class="create-card" @click="toCreatePlans">
            <ion-card-content class="card-content">
              <ion-label class="center-label">create</ion-label>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { IonPage, IonContent, IonCard, IonLabel, IonIcon } from "@ionic/vue";
import { ref, watch } from "vue";

export default defineComponent({
  name: "planDecision",
  components: {
    IonPage,
    IonContent,
  },
  setup() {
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

    return {
      router,
      toCreatePlans,
      toPrePlans,
    };
  },
});
</script>

<style scoped>
.grid-page {
  display: grid;
  height: 95%;
  grid-template-rows: [row1-start] 10% [row1-end] 45% [row2-start] 45% [row2-end];
  grid-template-columns: [column1-start] 100% [column1-end];
}

.headline-div {
  grid-row: row1-start / row1-end;
  align-self: end;
  justify-self: center;
}

.pick-plan {
  grid-row: row1-end / row2-start;
  align-self: center;
  justify-self: center;
  height: 100%;
  width: 100%;
}
.create-plan {
  grid-row: row2-start / row2-end;
  align-self: center;
  justify-self: center;
  height: 100%;
  width: 100%;
}

.pick-card {
  height: 95%;
  background-color: var(--ion-color-warning);
  display: flex;
}

.create-card {
  height: 95%;
  background-color: var(--ion-color-light);
}

p {
  font-weight: bold;
}

.card-content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-label {
  text-align: center;
  font-size: 64px;
  font-weight: bold;
  color: white;
}
</style>
