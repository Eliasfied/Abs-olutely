<template>
  <ion-card>
    <div class="grid-style">
      <div class="ionImage">
        <img alt="" :src="getImgUrl()" />
      </div>
      <div class="close-icon">
        <ion-icon
          @click="$emit('closeModal')"
          color="danger"
          :icon="closeCircleOutline"
        ></ion-icon>
      </div>
      <div>
        <ion-card-header class="header">
          <ion-card-title color="primary">{{
            props.proplist[props.index].name
          }}</ion-card-title>
          <ion-card-subtitle class="subtitle"
            >Difficulty: {{ props.proplist[props.index].difficulty }}
          </ion-card-subtitle>
        </ion-card-header>
      </div>
      <div>
        <ion-card-content>
          {{ props.proplist[props.index].description }}
        </ion-card-content>
      </div>
    </div>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { closeCircleOutline } from "ionicons/icons";
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonModal,
} from "@ionic/vue";

export default defineComponent({
  name: "ExerciseDetail",
  props: ["proplist", "index"],
  setup(props) {


    function getImgUrl() {
      return require("../../assets/exercises/" +
        props.proplist[props.index].name +
        ".gif");
    }

    function closeModal() {
      console.log("modal closed");
    }

    return {
      IonContent,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardTitle,
      IonCardSubtitle,
      IonModal,
      props,
      getImgUrl,
      closeCircleOutline,
      closeModal,
    };
  },
});
</script>

<style scoped>
.grid-style {
  height: 100%;
  width: 100%;
  background-size: cover;
  display: grid;
  grid-template-rows: [row1-start] 15% [row1-end] 35% [row2-start] 20% [row2-end]30% [row3-start];
  grid-template-columns: [line1-1] 100% [line2-1];
}

ion-card {
  height: 100%;
  border-radius: 16px;
  border: 3px solid black;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  animation: card-in 0.3s ease-out forwards;
}

@keyframes card-in {

  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  
}

.ionImage {
  background-size: cover;
  text-align: center;
  grid-row: row1-start / row2-start;
  grid-column: line1-1 / line2-1;
}

.close-icon {
  grid-row: row1-start / row1-end;
  grid-column: line1-1 / line2-1;
  justify-self: end;
  margin-right: 5px;
}

.header {
  border-top: 2px solid #003554;
}

ion-icon {
  font-size: 48px;
}

ion-card-subtitle {
  color: #003554;
}

ion-card-content {
  color: #003554;
}
</style>
