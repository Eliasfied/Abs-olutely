<template>
  <ion-footer :translucent="true">
    <ion-toolbar color="secondary">
      <ion-buttons>
        <ion-button>
          <ion-icon :icon="settings"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon :icon="map"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon :icon="home"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon :icon="barbell"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { settings, home, map, barbell } from "ionicons/icons";
import { IonFooter, IonIcon, IonToolbar, IonButtons, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheFooter",
  components: {
    IonFooter,
    IonIcon,
    IonToolbar,
    IonButtons,
    IonButton
  },
  setup() {
    return { settings, home, map, barbell };
  },
});
</script>

<style scoped>



ion-icon {
  font-size: 36px;
  color: var(--ion-color-primary);
  margin: 12px;
}
</style>
>
