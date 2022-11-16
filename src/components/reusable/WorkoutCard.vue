<template>
  <router-link class="routerLink" :to="urlprefix + props.workoutName">
    <ion-card
      :style="{ 'background-image': 'url(' + workoutImage + ')' }"
      class="CardImage"
    >
      <ion-card-header>
        <ion-card-title color="secondary">{{
          props.workoutName
        }}</ion-card-title>
      </ion-card-header>
      <ion-card-content> </ion-card-content>
    </ion-card>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";
import { computed } from "vue";

export default defineComponent({
  components: {
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
  },
  name: "WorkoutCard",
  props: ["urlprefix", "workoutName", "imageName"],
  setup(props) {
    let proptest = "beginner";
    console.log("workoutname props: ");
    console.log(props.workoutName);
    console.log(proptest);

    const workoutImage = computed(() => {
      return require("../../assets/HomePageWorkoutImages/" +
        props.imageName +
        ".png");
    });
    console.log(workoutImage);

    return { props, workoutImage, proptest };
    
  },
});
</script>

<style scoped>
.CardImage {
  height: 100%;
  margin: 0;
  background-size: cover;
  /* background-image: v-bind(workoutImage); */
}

ion-card-title {
  font-size: 40px;
}

.routerLink {
  text-decoration: none;
}
</style>
