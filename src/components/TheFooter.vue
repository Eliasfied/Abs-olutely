<template>
  <ion-footer :translucent="true">
    <ion-toolbar>
      <ion-icon :icon="settings"></ion-icon>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import {settings} from "ionicons/icons";
import { IonFooter, IonIcon, IonToolbar } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheFooter",
  components: {
    IonFooter,
    IonIcon,
    IonToolbar,
    
  },
  setup() {
    return { settings };
  },
});
</script>
