<template>
  <ion-footer :translucent="true">
    <ion-toolbar>
      <ion-title>EasyAbs</ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { IonFooter, IonTitle, IonToolbar } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheFooter",
  components: {
    IonFooter,
    IonTitle,
    IonToolbar,
  },
});
</script>
