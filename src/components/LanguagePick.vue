<template>
    <ion-page>
      <ion-header>
    <ion-toolbar color="danger">
      <ion-title>
        Tab One
      </ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content>
  
    <ion-item>
        <ion-select @ionChange="changeLanguage()" value="en">
          <ion-select-option value="en">English</ion-select-option>
          <ion-select-option value="es">Spanish</ion-select-option>
          <ion-select-option value="fr">French</ion-select-option>
        </ion-select>
      </ion-item>
  
      <ion-grid>
        <ion-row>
          <ion-col class="content-header">
            Translated by HTTP Loader - From external JSON
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-card class="ion-padding">
        <ion-card-header>
          Simple
        </ion-card-header>
        <ion-card-content>
          <!-- <h1>{{ $t("title") }}</h1> -->
          <!-- <p>{{ $t("description") }}</p> -->
        </ion-card-content>
      </ion-card>
      <ion-card class="ion-padding">
        <ion-card-header>
          Simple with directive
        </ion-card-header>
        <ion-card-content>
          <h1 v-t="'title'"></h1>
          <p v-t="'description'"></p>
        </ion-card-content>
      </ion-card>
  
      <ion-card class="ion-padding">
        <ion-card-header>
          With params, with directive
        </ion-card-header>
        <ion-card-content>
          <h1 v-t="{ path: 'TITLE_2', args: { value: 'John' } }">TITLE</h1>
          <p v-t="'description'"></p>
        </ion-card-content>
      </ion-card>
      <ion-card class="ion-padding">
        <ion-card-header>
          With Params, nested JSON data and directive
        </ion-card-header>
        <ion-card-content>
          <h1 v-t="{ path: 'data.name', args: { name_value: 'John' } }">data.name</h1>
        </ion-card-content>
      </ion-card>
  </ion-content>
    </ion-page>
  </template>
  
  
<script lang="ts">

import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonSegment, IonSegmentButton, IonContent, IonItem, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonListHeader, IonLabel, IonImg } from '@ionic/vue';
export default defineComponent({
    components: {
        IonPage,
        IonHeader, 
        IonToolbar, 
        IonButtons, 
        IonMenuButton, 
        IonTitle, 
        IonSegment, 
        IonSegmentButton, 
        IonContent, 
        IonItem, 
        IonSelect, 
        IonSelectOption, 
        IonGrid, 
        IonRow, 
        IonCol, 
        IonCard, 
        IonCardHeader, 
        IonCardContent, 
        IonListHeader, 
        IonLabel, 
        IonImg
    },
    setup() {

        let language = "en";

        function changeLanguage() {
         //  $i18n.locale = $event.detail.value;
        }



        return {
            changeLanguage
        }
        
    },
})
</script>


  <style lang="css" scoped>
  .color {
    color: white;
  }
  ion-card-header{
      border-bottom: 1px solid #ccc;
      padding: 0 0 10px 0;
      font-weight: bold;
    }
    .content-header{
      padding: 5px 15px;
      font-size: 20px;
      font-weight: bold;
    }
    ion-card-content{
      padding: 5px 0 0 0;
    }
    ion-card{
      margin-top: 10px;
      margin-bottom: 10px;
    }