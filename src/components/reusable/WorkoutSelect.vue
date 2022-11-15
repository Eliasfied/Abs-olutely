<template>
  <ion-card class="display-card" color="dark">
    <div class="timeAndCountDiv">
      <p class="timeLabel">{{ props.name }}</p>
      <ion-select
        v-model="timeSelected"
        :placeholder="'' + props.time"
        @ionChange="$emit('updateTime', timeSelected)"
      >
        <ion-select-option
          v-for="(option, index) in props.options"
          :key="index"
          :value="option"
          >{{ option }}</ion-select-option
        >
      </ion-select>
    </div></ion-card
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonSelect, IonSelectOption } from "@ionic/vue";
import { ref } from "vue";

export default defineComponent({
  name: "WorkoutSelect",
  props: ["time", "options", "name"],
  emits: ["updateTime"],
  components: { IonCard, IonSelect, IonSelectOption },
  setup(props) {
    let timeSelected = ref(1);
    return { props, timeSelected };
  },
});
</script>
