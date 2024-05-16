import { useWorkoutsStore } from "@/store/workouts";

//return an array with every workoutID and workoutName in one object {id: workoutId, name: workoutName}
export default function getDefaultWorkoutIds() {
    const workoutsStore = useWorkoutsStore();
    return workoutsStore.workoutList.map((workout) => ({
        id: workout.id,
        name: workout.name,
    }));
  
}