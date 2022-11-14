<template>
  <ion-card color="primary">
    <div class="grid-style-finish">
      <div class="finish-text">{{ finishText }}</div>
      <div class="finish-subtext">{{ finishSubtext }}</div>
      <div class="finish-workout">
        <img :src="finishedImage" alt="" />
      </div>
      <div class="finish-buttons">
        <router-link to="/" replace
          ><ion-button @click="$emit('resetAll')" color="secondary"
            >Back To Menu</ion-button
          ></router-link
        >
      </div>
    </div>
  </ion-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonButton } from "@ionic/vue";
import { computed } from "vue";

export default defineComponent({
  name: "FinishedPage",
  components: { IonCard, IonButton },
  props: ["page"],
  setup(props) {
    let finishText = "Good Job!";
    let finishSubtext = "You completed the " + props.page + " workout:";

    const finishedImage = computed(() => {
      console.log(props.page);
      return props.page == "beginner" ||
        props.page == "advanced" ||
        props.page == "champ"
        ? require("../assets/HomePageWorkoutImages/" + props.page + ".png")
        : require("../assets/HomePageWorkoutImages/beginner.png");
    });

    return { props, finishText, finishSubtext, finishedImage };
  },
});
</script>

<style scoped>
.grid-style-finish {
  height: 100%;
  width: 100%;
  background-size: cover;
  display: grid;
  grid-template-rows: [row1-start] 15% [row1-end] 15% [row2-start] 10% [row2-end]35% [row3-start] 25% [row3-end];
  grid-template-columns: [line1] 100% [line2];
}

ion-card {
  height: 100%;
  width: 100%;
  margin: 0;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

img {
  height: 100%;
  width: 100%;
}

.finish-text {
  font-size: 48px;
  justify-self: center;
  align-self: center;
  grid-row: row1-end / row2-start;
  grid-column: line1 / line2;
}

.finish-subtext {
  font-size: 18px;
  justify-self: center;
  align-self: center;
  grid-row: row2-start / row2-end;
  grid-column: line1 / line2;
}

.finish-workout {
  justify-self: center;
  align-self: center;
  grid-row: row2-end / row3-start;
  grid-column: line1 / line2;

  width: 100%;
  height: 100%;
}

.finish-buttons {
  justify-self: center;
  align-self: center;
  grid-row: row3-start / row3-end;
  grid-column: line1 / line2;
  width: 100%;
}

ion-button {
  width: 100%;
}
</style>
