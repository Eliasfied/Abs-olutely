<template>
  <ion-card class="display-card" :color="props.backgroundColor">
    <div class="timeAndCountDiv">
      <!-- <p class="timeLabel">{{ props.name }}</p> -->
      <ion-icon size="large" :icon="selectIcon"></ion-icon>
      <ion-select
        :style="{ '--placeholder-color': props.placeholderColor }"
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
import { computed, defineComponent } from "vue";
import { IonCard, IonSelect, IonSelectOption, IonIcon } from "@ionic/vue";
import { ref } from "vue";
import { hourglassOutline, barbellOutline } from "ionicons/icons";

export default defineComponent({
  name: "WorkoutSelect",
  props: ["time", "options", "name", "placeholderColor", "backgroundColor"],
  emits: ["updateTime"],
  components: { IonCard, IonSelect, IonSelectOption, IonIcon },
  setup(props) {
    let timeSelected = ref(1);
    let selectIcon = computed(() => {
      return props.name == "BreakTime" ? hourglassOutline : barbellOutline;
    });

    return {
      props,
      timeSelected,
      hourglassOutline,
      barbellOutline,
      selectIcon,
    };
  },
});
</script>

<style scoped>
ion-select {
  --placeholder-opacity: 1;
}

ion-select::part(icon) {
  color: var(--ion-color-success);
  opacity: 1;
}
</style>
