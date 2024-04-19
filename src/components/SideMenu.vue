<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-title color="primary">Menü</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="secondary">
      <ion-list>
        <ion-menu-toggle>
          <ion-item router-link="/home" color="secondary"
            ><ion-icon
              :class="{ active: isActive('/home') }"
              slot="start"
              :icon="homeOutline"
            ></ion-icon>
            <p :class="{ active: isActive('/home') }">Startseite</p>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item router-link="/prePlans" class="list-item" color="secondary"
            ><ion-icon
              :class="{ active: isActive('/prePlans') }"
              slot="start"
              :icon="readerOutline"
            ></ion-icon>
            <p :class="{ active: isActive('/prePlans') }">Pläne</p></ion-item
          >
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item
            router-link="/preWorkouts"
            class="list-item"
            color="secondary"
            ><ion-icon
              :class="{ active: isActive('/preWorkouts') }"
              slot="start"
              :icon="barbellOutline"
            ></ion-icon>
            <p :class="{ active: isActive('/preWorkouts') }">
              Workouts
            </p></ion-item
          >
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item router-link="/exerciseList" color="secondary"
            ><ion-icon
              :class="{ active: isActive('/exerciseList') }"
              slot="start"
              :icon="listCircleOutline"
            ></ion-icon>
            <p :class="{ active: isActive('/exerciseList') }">
              Übungen
            </p></ion-item
          >
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item router-link="/statistics" color="secondary"
            ><ion-icon
              :class="{ active: isActive('/statistics') }"
              slot="start"
              :icon="analyticsOutline"
            ></ion-icon>
            <p :class="{ active: isActive('/statistics') }">
              Statistiken
            </p></ion-item
          >
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item router-link="/myPlans" class="list-item" color="secondary"
            ><ion-icon
              :class="{ active: isActive('/myPlans') }"
              slot="start"
              :icon="readerSharp"
            ></ion-icon>
            <p :class="{ active: isActive('/myPlans') }">
              personalisierte Pläne
            </p></ion-item
          >
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item
            router-link="/myworkouts"
            class="list-item"
            color="secondary"
            ><ion-icon
              :class="{ active: isActive('/myworkouts') }"
              slot="start"
              :icon="barbellSharp"
            ></ion-icon>
            <p :class="{ active: isActive('/myworkouts') }">
              personalisierte Workouts
            </p></ion-item
          >
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item router-link="/settings" color="secondary"
            ><ion-icon
              :class="{ active: isActive('/settings') }"
              slot="start"
              :icon="settingsOutline"
            ></ion-icon>
            <p :class="{ active: isActive('/settings') }">
              Einstellungen
            </p></ion-item
          >
        </ion-menu-toggle>
      </ion-list>

      <ion-list class="bottom-list">
        <ion-menu-toggle v-if="isLoggedIn">
          <ion-item router-link="/profile" color="secondary"
            ><ion-icon
              :class="{ active: isActive('/profile') }"
              slot="start"
              :icon="personOutline"
            ></ion-icon>
            <p :class="{ active: isActive('/profile') }">Profil</p>
          </ion-item>
          <ion-item @click="logout" color="secondary"
            ><ion-icon
              slot="start"
              :icon="logOutOutline"
            ></ion-icon>
            <p>Logout</p>
          </ion-item>
        </ion-menu-toggle>

        <ion-menu-toggle v-else>
          <ion-item router-link="/login" color="secondary"
            ><ion-icon
              :class="{ active: isActive('/login') }"
              slot="start"
              :icon="logInOutline"
            ></ion-icon>
            <p>Login</p>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonMenuToggle,
} from "@ionic/vue";
import {
  homeOutline,
  barbellOutline,
  listCircleOutline,
  calendarOutline,
  settingsOutline,
  analyticsOutline,
  readerOutline,
  readerSharp,
  barbellSharp,
  personOutline,
  logInOutline,
  logOutOutline,
} from "ionicons/icons";

import { ref, watch, onMounted } from "vue";
import { menuController } from "@ionic/core";
import { onIonViewWillEnter } from "@ionic/vue";
import { useRoute, useRouter } from "vue-router";
import { loginStore } from "@/store//authentication/loginStore";
import { fireBaseLogout } from "@/services/fireBaseService";


export default defineComponent({
  name: "SideMenu",
  props: ["closeMenu"],

  components: {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonContent,
    IonIcon,
    IonMenuToggle,
  },
  setup(props) {
    watch(props.closeMenu, (newValue) => {
      if (props.closeMenu == true) {
        menuController.close();
      }
    });

    const store = loginStore();
    const router = useRouter();
    const isLoggedIn = ref(false);

    onMounted(async () => {
      console.log("bin in onMounted drin");
      await store.checkLoginStatus();
      isLoggedIn.value = store.isLoggedIn;
    });
    const route = useRoute();
    const isActive = (path) => {
      return path === route.fullPath;
    };

    watch(
      () => store.isLoggedIn,
      (newIsLoggedIn) => {
        isLoggedIn.value = newIsLoggedIn;
      }
    );

    function logout() {
      store.logout();
      isLoggedIn.value = store.isLoggedIn;
      fireBaseLogout();
      router.push("/login");
    }

    return {
      homeOutline,
      barbellOutline,
      listCircleOutline,
      calendarOutline,
      settingsOutline,
      analyticsOutline,
      readerOutline,
      readerSharp,
      barbellSharp,
      personOutline,
      logInOutline,
      logOutOutline,
      isLoggedIn,
      isActive,
      logout,
    };
  },
});
</script>

<style scoped>
p {
  color: var(--ion-color-primary);
}

ion-icon {
  color: var(--ion-color-primary);
}

ion-list {
  background-color: var(--ion-color-secondary);
}

.routerLink {
  text-decoration: none;
}

ion-toolbar {
  border-bottom: 2px solid black;
}

.active {
  color: var(--ion-color-light);
}

.bottom-list {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
