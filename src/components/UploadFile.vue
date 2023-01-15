<script setup lang="ts">
import { ref } from 'vue'
import axios from "axios";

// ローカル用と本番用で変えたい
axios.defaults.baseURL = 'http://192.168.1.3:8888';

// ドロップ判定用
let isEnter = ref(false)
// ファイル格納用
let file = ref()
// 処理状況判定用
let processing = ref(false)

const dragEnter = () => isEnter.value = true
const dragLeave = () => isEnter.value = false
const dropFile = (e: DragEvent) => {
  file.value = e.dataTransfer!.files[0]
  isEnter.value = false
}

const add_info = () => {
  // 処理状況を処理中にする
  processing.value = true
  // パラメータにFormDataを設定
  const params = new FormData;
  // パラメータにファイルを追加
  params.append("file", file.value);
  axios
    .post('/gml', params, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application / x-www-form-urlencoded',
      }
    })
    // .get('/test')
    .then(response => {
      // ファイル名に追加した情報を加える
      let downloadFile = file.value.name
      let fileName = downloadFile.split('.')[0] // ベースネーム
      let ext = downloadFile.split('.')[1] // 拡張子
      downloadFile = fileName + '_all' + '.' + ext //追加情報を加えたファイル名

      let data = response.data;
      const blob = new Blob([data], { type: 'application/octet-stream' })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = downloadFile
      link.click()
      processing.value = false
      file.value = null
    })
}

</script>

<template>
  <div class="drop_area" @dragenter="dragEnter" @dragleave="dragLeave" @dragover.prevent @drop.prevent="dropFile"
    :class="{enter: isEnter}">
    ファイルをドラッグ＆ドロップ
  </div>
  <div v-if="file">
    ファイル名：{{ file.name }}
  </div>
  <div class="process mt-4">
    <div v-if="!processing && file">
      <button class="btn btn-outline-primary btn-lg" type="button" v-on:click='add_info'>処理開始</button>
    </div>
    <div v-else-if="!processing && !file">
      <button class="btn btn-outline-primary btn-lg" type="button" disabled v-on:click='add_info'>処理開始</button>
    </div>
    <div v-else>
      <button class="btn btn-outline-primary btn-lg" type="button" disabled v-on:click='add_info'>処理中</button>
      <p>処理完了まで５分程度かかります。<br/>処理中はブラウザは閉じないでください</p>
    </div>
  </div>
  
</template>


<style>
.drop_area {
  color: gray;
  font-weight: bold;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 300px;
  border: 5px solid gray;
  border-radius: 15px;
}

.enter {
  border: 10px dotted powderblue;
}

.process {
  margin-left: 13rem;
}

.process p{
  margin-left: -16rem;
  margin-top: 1rem;
  text-align: center;
}
</style>