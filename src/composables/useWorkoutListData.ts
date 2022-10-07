import { ref } from "vue";
import { useWorkoutsStore } from "../store/workouts";

const store = useWorkoutsStore();
// const list = store.workoutList.find((element) => element.name == page);