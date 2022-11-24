<template>
  <ion-page>
    <the-footer title="ExerciseList"></the-footer>

    <ion-content color="secondary" :fullscreen="true">
      <div class="grid-page">
        <div class="search-bar">
          <ion-searchbar
            :debounce="500"
            @ionChange="handleChange($event)"
          ></ion-searchbar>
        </div>
        <div class="exercise-list">
          <ol>
            <li v-for="(result, index) in results" :key="result">
              <ion-card @click="showDetails(index)">
                <div class="card-grid">
                  <div class="title-div">
                    <ion-card-header
                      ><ion-card-title class="card-title">
                        {{ result.name }}</ion-card-title
                      ></ion-card-header
                    >
                  </div>
                  <div class="img-div">
                    <img
                      class="exercise-img"
                      :src="getExerciseURL(index)"
                      alt=""
                    />
                  </div>
                </div>
              </ion-card>
            </li>
          </ol>
        </div>
      </div>
      <div v-if="showModal" class="alignCard">
        <exercise-detail
          @closeModal="closeModal"
          :proplist="proplist"
          :index="propIndex"
          v-show="showModal"
        ></exercise-detail>
      </div> </ion-content
  ></ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";
import TheFooter from "./reusable/TheFooter.vue";
import { ref, onBeforeMount } from "vue";
import { getExerciseList } from "../composables/getExerciseList";
import ExerciseDetail from "./reusable/ExerciseDetail.vue";

export default defineComponent({
  name: "ExerciseListPage",
  components: {
    IonContent,
    IonPage,
    TheFooter,
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    ExerciseDetail,
  },
  setup() {
    let exerciseList: any[] = [];
    let results = ref();
    async function init() {
      exerciseList = await getExerciseList();
      results.value = exerciseList;
      proplist.value = results.value;
      console.log("proplist");
      console.log(proplist);
    }

    onBeforeMount(() => init());

    //POPUP EXERCISE DETAIL
    let proplist = ref();
    let propIndex = ref(0);
    let showModal = ref(false);
    function showDetails(index) {
      console.log("showdetails!");
      console.log(index);
      showModal.value = !showModal.value;
      propIndex.value = index;
    }
    function closeModal() {
      showModal.value = !showModal.value;
    }

    function handleChange(event) {
      const query = event.target.value.toLowerCase();
      results.value = exerciseList.filter(
        (d) => d.name.toLowerCase().indexOf(query) > -1
      );
      proplist.value = results.value;
    }

    function getExerciseURL(index) {
      return require("../assets/exercises/" +
        results.value[index].name +
        ".png");
    }

    return {
      results,
      handleChange,
      getExerciseURL,
      showDetails,
      closeModal,
      propIndex,
      showModal,
      proplist,
    };
  },
});
</script>

<style scoped>
.grid-page {
  display: grid;
  height: 100%;
  grid-template-rows: 10% 90%;
}

.search-bar {
  align-self: center;
}

ol {
  width: 100%;
  height: 95%;
  list-style: none;
  padding: 0;
  overflow-y: auto;
  margin: 0;
}

li {
  height: 10%;
}

ion-card {
  height: 100%;
}

.card-grid {
  height: 100%;
  display: grid;
  grid-template-columns: 70% 30%;
}

.card-title {
  color: black !important;
}
.exercise-img {
  height: 100%;
  width: 100%;
}

.alignCard {
  position: fixed;
  height: 40%;
  bottom: 25%;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
