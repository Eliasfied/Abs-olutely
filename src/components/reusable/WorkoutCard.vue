<template>
  <router-link class="routerLink" :to="urlprefix + props.workoutName">
    <ion-card
      class="CardImage"
    >
    <div class="card-grid">
      <div class="workout-name"><p>{{ props.workoutName }}</p></div>
      <div v-show="showStar1" class="difficulty-one">
        <ion-icon :icon="flashSharp"></ion-icon>
      </div>
      <div v-show="showStar2" class="difficulty-two">
        <ion-icon :icon="flashSharp"></ion-icon>
      </div>
      <div v-show="showStar3" class="difficulty-three">
        <ion-icon :icon="flashSharp"></ion-icon>
      </div>
    </div>
    
    </ion-card>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCard, IonIcon,
 
} from "@ionic/vue";
import { computed } from "vue";
import {
 flashSharp
} from "ionicons/icons";

export default defineComponent({
  components: {
    IonCard,
    IonIcon,
    
  },
  name: "WorkoutCard",
  props: ["urlprefix", "workoutName", "imageName", "difficulty"],
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

    let showStar1 = computed(() => {
      return props.difficulty == "1" || props.difficulty == "2" || props.difficulty == "3" ? true : false;
    })
    let showStar2 = computed(() => {
      return props.difficulty == "2" || props.difficulty == "3" ? true : false;
    })
    let showStar3 = computed(() => {
      return props.difficulty == "3" ? true : false;
    })

    return { props, workoutImage, proptest, flashSharp, showStar1, showStar2, showStar3 };
    
  },
});
</script>

<style scoped>
.CardImage {
  height: 100%;
  margin: 0;

}

.card-grid{
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 25% [row1-end] 20% [row2-start] 55% [row2-end];
  grid-template-columns: [column1-start] 5% [column1-end] 15% [column2-start] 15% [column2-end] 15% [column3-start] 50% [column3-end];
}

.workout-name{
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column3-end;
  align-self: center;
}
.difficulty-one {
  grid-row: row1-end / row2-start;
  grid-column: column1-end / column2-start;
  align-self: center;

}
.difficulty-two {
  grid-row: row1-end / row2-start;
  grid-column: column2-start / column2-end;
  align-self: center;

}
.difficulty-three {
  grid-row: row1-end / row2-start;
  grid-column: column2-end / column3-start;
  align-self: center;

}

ion-card {
  background-color: #bce3f7;
  color: white;
}

ion-icon {
  font-size: x-large;
  color: yellow;
}

p {
  font-size:larger;
  font-weight: bold;
}

.routerLink {
  text-decoration: none;
}
</style>
