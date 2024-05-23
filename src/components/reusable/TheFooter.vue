<template>
  <div class="ion-page" id="main-content"></div>
  <ion-header :translucent="true">
    <ion-toolbar color="secondary">
      <ion-buttons slot="start">
        <ion-menu-button color="primary"></ion-menu-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="goToNotifications">
          <ion-icon
            :icon="notificationsOutline"
            :class="{
              'has-notifications': hasUnreadNotifications,
              'no-notifications': !hasUnreadNotifications,
            }"
          ></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title color="primary">{{ props.title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { menuOutline, person } from "ionicons/icons";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonMenuButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import useNotifications from "@/composables/notifications/useNotifications";
import { notificationsOutline } from "ionicons/icons";

export default defineComponent({
  name: "TheFooter",

  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonMenuButton,
  },
  props: ["title", "closeMenu"],
  setup(props) {
    const { hasUnreadNotifications } = useNotifications();
    const router = useRouter();

    const goToNotifications = () => {
      router.push("/notificationsIncoming");
    };
    return {
      menuOutline,
      person,
      props,
      hasUnreadNotifications,
      goToNotifications,
      notificationsOutline,
    };
  },
});
</script>

<style scoped>
ion-toolbar {
  border-bottom: 0.5px solid black;
}

ion-title {
  font-weight: bold;
}

ion-icon {
  font-size: 42px;
  color: var(--ion-color-tertiary);
  margin: 12px;
}

ion-icon.no-notifications {
  color: var(--ion-color-primary);
}

ion-icon.has-notifications::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
}
</style>
