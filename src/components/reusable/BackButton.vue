<template>
  <ion-icon class="icon" @click="goBack" :icon="arrowBack"></ion-icon>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonIcon } from "@ionic/vue";
import { computed } from "vue";
import { arrowBack } from "ionicons/icons";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  components: {
    IonIcon,
  },
  name: "BackButton",
  setup() {
    const router = useRouter();
    function goBack() {
      router.go(-1);
    }
    return { arrowBack, goBack };
  },
});
</script>

<style scoped>
.icon {
  font-size: 32px;
  color: var(--ion-color-light);
  margin: 2.5%;
}
</style>
