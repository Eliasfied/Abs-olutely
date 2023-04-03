import { reactive } from "vue";
import { useRoute } from "vue-router";

interface RouteState {
  currentRouteId: number | null;
}

const state: RouteState = reactive({
  currentRouteId: null,
});

export default function useRouteId() {
  const route = useRoute();

  state.currentRouteId = Number(route.params.id);

  return {
    currentRouteId: state.currentRouteId,
  };
}
