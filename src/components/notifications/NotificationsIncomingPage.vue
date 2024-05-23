<template>
  <ion-page>
    <HeaderComponent title="Notifications" />
    <ion-content color="tertiary">
      <ion-card
        @click="acknowledge(notification)"
        v-for="(notification, index) in notifications"
        :key="index"
      >
        <ion-card-content class="notification-card">
          <div class="notification-dot"></div>
          <div class="notification-header">
            <ion-avatar>
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </ion-avatar>
            <div class="notification-content card-content-right-margin">
              <p class="notification-text">{{ notification.text }}</p>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
//imports
import { getAllNotifications } from "@/services/notificationService";
import { acknowledgeNotification } from "@/services/notificationService";
import { ref, onMounted } from "vue";
import { loginStore } from "@/store/authentication/loginStore";
import { IonCardContent, IonAvatar } from "@ionic/vue";
import useNotifications from "@/composables/notifications/useNotifications";
import useNotificationActions from "@/composables/notifications/useNotificationActions";
import { useRouter } from "vue-router";
import { getSignalRService } from "@/composables/notifications/signalRInstance";
import { useMyWorkoutsStore } from "@/store/myWorkouts";

//loginStore
const router = useRouter();
const logStore = loginStore();
const workoutsStore = useMyWorkoutsStore();

//notifications
const { performNotificationAction } = useNotificationActions();
const { setHasUnreadNotifications } = useNotifications();
const acknowledge = async (notificationValue: any) => {
  try {
    await acknowledgeNotification(notificationValue.id);
    notifications.value = notifications.value.filter(
      (notification: any) => notification.id !== notificationValue.id
    );
    if (notifications.value.length === 0) {
      setHasUnreadNotifications(false);
    }
    await performNotificationAction(
      notificationValue,
      router,
      workoutsStore,
      logStore
    );
  } catch (error) {
    console.log(error);
  }
};

const notifications = ref([]) as any;

//mounted
onMounted(async () => {
  await getNotifications();

  const signalRService = getSignalRService();
  signalRService.sharedShoppingListListener(async () => {
    await getNotifications();
  });
});

// helper functions
const getNotifications = async () => {
  await getAllNotifications(logStore.userId as string).then((response) => {
    notifications.value = response.data.filter(
      (notification: any) => notification.isAcknowledged === false
    );
  });
};
</script>

<style scoped>
ion-card {
  margin: 0;
  border: none;
  background-size: cover;
  background-position: center;
}

.notification-card {
  display: flex;
  align-items: center;
}

.notification-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  margin-right: 10px;
}

.notification-header {
  display: flex;
  align-items: center;
}

.notification-text {
  color: black;
  font-weight: bold;
}

ion-avatar {
  margin-right: 10px;
  margin-left: 10px;
}
</style>
