<template>
  <div>
    <div class="d-flex justify-content-center" @dragover.prevent @drop="dropFile">
      <div>
        <!-- 波形区域 --->
        <div>
          <canvas class="border" ref="canvas" style="width: 40rem; height: 20rem"></canvas>
        </div>
        <form class="form-horizontal">
          <label class="form-lable" for="waveColor">波形颜色：</label>
          <input id="waveColor" type="color" class="form-control-inline" v-model="waveColor" />
        </form>
        <br />
        <!-- 播放器 -->
        <div>
          <audio ref="player" controls @ended="playEnd()"></audio>
        </div>
        <br />
        <!-- 文件导入 -->
        <div>
          <span v-if="!playList.length">选择或拖拽至任意区域上传</span>
          <input ref="fileInput" class="form-control" type="file" accept=".mp3,.wav,.flac" @change="fileUpload" />
        </div>
        <br />
        <!-- 播放列表 -->
        <div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="listCycle" id="listCycle" />
            <label class="form-check-label" for="listCycle"> 列表循环 </label>
          </div>
          <a class="btn btn-secondary" @click="playListButtonClick()"><i class="bi bi-list-ol"></i></a>
          <ul v-if="showPlayList" class="list-group">
            <li v-for="(item, index) in playList" :key="index"
              :style="{ color: currentPlay == index ? 'red' : 'black' }" class="list-group-item"
              @click="playListClick(index)">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <SearchComponent class="mt-3" @itemSelect="itemSelect"></SearchComponent>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Notify } from "./notify.vue";
import SearchComponent from "./search.vue";
@Options({
  components: {
    SearchComponent
  },
})
export default class PlayerComponent extends Vue {
  /**
   * AudioContext
   */
  audioContext!: AudioContext;
  /**
   * AudioAnalyser
   */
  analyser!: AnalyserNode;
  /**
   * AudioSourceNode
   */
  audioSourceNode!: MediaElementAudioSourceNode;
  /**
   * 波形数组
   */
  waveData!: Uint8Array;
  /**
   * 波形颜色
   */
  waveColor = "#0080FF";
  /**
   * 播放器
   */
  player!: HTMLAudioElement;
  /**
   * 列表循环
   */
  listCycle = true;
  /**
   * 画布
   */
  canvas!: HTMLCanvasElement;
  /**
   * 当前播放
   */
  currentPlay = 0;
  /**
   * 播放列表
   */
  playList: { name: string; url: string }[] = [];
  /**
   * 是否显示播放列表
   */
  showPlayList = true;
  /**
   * mounted
   */
  mounted(): void {
    this.player = this.$refs.player as HTMLAudioElement;
    this.canvas = this.$refs.canvas as HTMLCanvasElement;
  }
  /**
   * 设置歌曲并播放
   */
  setCurrentAndPlay(index: number): void {
    this.currentPlay = index;
    this.player.src = this.playList[index].url;
    setTimeout(() => {
      if (!this.audioContext) {
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.audioSourceNode = this.audioContext.createMediaElementSource(
          this.player
        );
        this.audioSourceNode.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        this.waveData = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(this.waveData);
        setInterval(() => {
          this.analyser.getByteFrequencyData(this.waveData);
          this.paintWave(this.waveData);
        }, 10);
      }
      this.player.play();
    }, 1);
  }
  /**
   * 播放结束
   */
  playEnd(): void {
    if (this.listCycle && this.playList.length) {
      this.setCurrentAndPlay((this.currentPlay + 1) % this.playList.length);
    }
  }
  /**
   * 歌曲上传后
   */
  fileUpload(): void {
    const fileInput = this.$refs.fileInput as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length) {
      this.loadFileAndPlay(files[0]);
    }
  }
  /**
   * 加载文件并播放
   */
  loadFileAndPlay(file: File) {
    if (!file.type.includes("audio")) {
      Notify.warning("非音频文件");
      return;
    } else {
      Notify.success("上传成功");
    }
    this.addToPlayList(file.name, file);
  }
  /**
   * 播放列表添加
   */
  addToPlayList(name: string, item: string | File) {
    const existIndex = this.playList.findIndex(
      (item) => item.name == name
    );
    let playIndex = 0;
    if (existIndex != -1) {
      playIndex = existIndex;
    } else {
      let url;
      if (item instanceof File) {
        url = URL.createObjectURL(item);
      } else {
        url = item;
      }
      this.playList.push({
        name: name,
        url: url,
      });
      playIndex = this.playList.length - 1;
    }
    this.setCurrentAndPlay(playIndex);
  }
  /**
   * 播放列表点击
   */
  playListClick(index: number): void {
    this.setCurrentAndPlay(index);
  }
  /**
   * 播放列表按钮点击
   */
  playListButtonClick(): void {
    this.showPlayList = !this.showPlayList;
  }
  /**
   * 绘制
   */
  paintWave(data: Uint8Array): void {
    const ctx = this.canvas.getContext("2d");
    if (ctx) {
      const width = this.canvas.width;
      const itemWidth = width / data.length;
      const height = this.canvas.height;
      ctx.clearRect(0, 0, width, height);

      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = this.waveColor;
      for (let i = 0; i < data.length; i++) {
        const itemHeight = (data[i] / 255) * height;
        ctx.fillRect(
          i * itemWidth,
          (height - itemHeight) / 2,
          itemWidth,
          itemHeight
        );
      }
    }
  }
  /**
   * 拖拽
   */
  dropFile(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length) {
      this.loadFileAndPlay(event.dataTransfer.files[0]);
    }
  }
  /**
   * 搜索框回车事件监听
   */
  itemSelect(info: { name: string, url: string }) {
    this.addToPlayList(info.name, info.url);
  }
}
</script>

<style scoped>

</style>
