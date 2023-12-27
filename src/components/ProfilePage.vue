<template>
  <p>Du bist nun eingeloggt! jubbi</p>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup(props: any, context: SetupContext) {
    const router = useRouter();

    return {};
  },
});
</script>
