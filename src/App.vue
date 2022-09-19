<template>
  <div>
    <PlayerComponent></PlayerComponent>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PlayerComponent from "./components/player.vue";
import NotifyComponent from "./components/notify.vue";

@Options({
  components: {
    PlayerComponent,
    NotifyComponent
  },
})
export default class App extends Vue { }
</script>

<style>

</style>
