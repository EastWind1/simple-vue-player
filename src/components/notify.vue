<template>
  <div
    class="notify"
    :class="{
      show: isShow,
      hidden: !isShow,
      success: level == 2,
      warning: level == 1,
    }"
  >
    {{ message }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { createApp } from "vue";

enum Level {
  INFO,
  WARNING,
  SUCCESS,
}

@Options({})
export default class NotifyComponent extends Vue {
  isShow = false;
  message = "";
  level = 1;
}

export class Notify {
  private static notify(msg: string, level: Level): void {
    let div = document.createElement("div") as HTMLDivElement;
    if (div) {
      div.remove();
      window.clearTimeout();
    }
    div = document.createElement("div") as HTMLDivElement;
    div.id = "notify";

    document.body.appendChild(div);
    let notify = createApp(NotifyComponent).mount("#notify") as NotifyComponent;
    notify.message = msg;
    notify.isShow = true;
    notify.level = level;
    setTimeout(() => {
      notify.isShow = false;
    }, 2000);
    setTimeout(() => {
      div.remove();
      window.clearTimeout();
    }, 3000);
  }
  static info(msg: string) {
    this.notify(msg, Level.INFO);
  }
  static warning(msg: string) {
    this.notify(msg, Level.WARNING);
  }
  static success(msg: string) {
    this.notify(msg, Level.SUCCESS);
  }
}
</script>

<style scoped>
.notify {
  position: absolute;
  top: 20%;
  right: 0;
  transform: translateX(100%);
  background-color: ivory;
  padding: 14px;
  border: 1px solid black;
  border-left: 10px solid blue !important;
}

.show {
  animation: inAnime 1s;
  transform: translateX(0) !important;
}

@keyframes inAnime {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

.hidden {
  animation: outAnime 1s;
  transform: translateX(100%) !important;
}

@keyframes outAnime {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100%);
  }
}

.success {
  border-left: 10px solid green !important;
}

.warning {
  border-left: 10px solid red !important;
}
</style>
