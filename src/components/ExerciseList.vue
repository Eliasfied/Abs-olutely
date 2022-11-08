<template>
  <ion-card>
    <ul>
      <li v-for="exercise in props.exerciseListStorage" :key="exercise">
        <ion-card>
          <ion-card-content> {{ exercise.name }}</ion-card-content>
        </ion-card>
      </li>
    </ul>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonCardContent } from "@ionic/vue";
export default defineComponent({
  name: "ExerciseList",
  props: ["exerciseListStorage", "index"],
  components: {
    IonCard,
    IonCardContent,
  },
  setup(props) {
    console.log("WO DENN: ");
    console.log(props.exerciseListStorage);

    return { props };
  },
});
</script>

<style scoped>
ion-card {
    height: 100%;
}

ul {
  list-style: none;
  padding: 0;
  overflow-y: auto;
  height: 95%;
  margin-bottom: 0px;
}
</style>
