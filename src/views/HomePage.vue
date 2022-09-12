<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-title>Beginner</ion-card-title>
                <ion-card-subtitle>out of form?</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
               
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col
            ><ion-card>
              <ion-card-header>
                <ion-card-title>Advanced</ion-card-title>
                <ion-card-subtitle>you are fit mate</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                
              </ion-card-content>
            </ion-card></ion-col
          >
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-title>Champ</ion-card-title>
                <ion-card-subtitle>name says it all</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCol,
    IonGrid,
    IonRow,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
  },
});
</script>

<style scoped>
ion-card {
  height: 200px;
  margin: 0;
}
</style>
