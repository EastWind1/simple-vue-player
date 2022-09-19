<template>
    <div>
        <div style="width: 80%">
            <input class="form-control" type="text" placeholder="请输入关键词" v-model="text" @keyup.enter="search()" />
        </div>
        <div>
            <ul class="list-group">
                <li class="list-group-item" v-for="item in music" :key="item.hash"
                    @click="itemSelect(item.filename, item.hash)">{{item.filename}}</li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import axios from "axios";
import { Vue, Options } from "vue-class-component";
import { Notify } from "./notify.vue";

@Options({})
export default class SearchComponent extends Vue {
    text = "";
    music: any[] = [];
    search() {
        if (!this.text) {
            Notify.warning("请输入关键词");
            return;
        }
        axios.get("http://mobilecdn.kugou.com/api/v3/search/song", {
            params: {
                format: "json",
                page: 1,
                pagesize: 20,
                keyword: this.text
            }
        }).then(res => {
            this.music = res.data.data.info;
        }).catch(err => {
            console.error(err);
        })
    }
    itemSelect(title: string, hash: string) {
        axios.get("http://m.kugou.com/app/i/getSongInfo.php", {
            params: {
                cmd: "playInfo",
                hash: hash
            }
        }).then(res => {
            if (res.data.error) {
                Notify.warning(res.data.error);
            } else {
                this.$emit("itemSelect", { name: title, url: res.data.url });
            }
        }).catch(err => {
            console.error(err);
        })
    }
}
</script>
<style>

</style>
