<script setup lang="ts">
import { ref } from 'vue'
import axios from "axios";

// ローカル用と本番用で変えたい
// axios.defaults.baseURL = 'http://192.168.1.2:8888';
axios.defaults.baseURL = 'https://116.80.66.216:5000';

// ドロップ判定用
let isEnter = ref(false)
// ファイル格納用
let files = ref()
// 処理状況判定用
let processing = ref(false)

let fileSize = ref(0)

const dragEnter = () => isEnter.value = true
const dragLeave = () => isEnter.value = false
const dropFile = (e: DragEvent) => {
  files.value = e.dataTransfer!.files
  isEnter.value = false
  fileSize.value = 0
  for(var i=0; i<files.value.length; i++){
    fileSize.value += files.value[i].size
  }
}

const add_info = () => {
    // 処理状況を処理中にする
    processing.value = true
  // パラメータにFormDataを設定
  const params = new FormData;
  // パラメータにファイルを追加
  for (let i = 0; i < files.value.length; i++) {
    // iの箇所の名前を使用して、ファイルを抽出する
    params.append(i.toString(), files.value[i])
  }
  axios
    .post('/mojxml2geojson', params, {
      responseType: 'blob',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data',
      }
    })
    // .get('/test')
    .then(response => {
      let data = response.data;
      if (data.type == 'application/octet-stream') {
        const blob = new Blob([data], { type: 'application/octet-stream' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'geojson変換後地図XML.zip'
        link.click()
        processing.value = false
        files.value = null
        fileSize.value = 0
      } else {
        const blob = new Blob([data], { type: data.type })
        console.log(blob)
        processing.value = false
        files.value = null
        fileSize.value = 0
        alert('処理失敗')
      }
    })
    .catch(error => {
      processing.value = false
      files.value = null
      fileSize.value = 0
      alert('変換サーバーが停止している可能性があります')
    })
}

</script>

<template>
  <div class="drop_area" @dragenter="dragEnter" @dragleave="dragLeave" @dragover.prevent @drop.prevent="dropFile"
    :class="{enter: isEnter}">
    ここにファイルをドラッグ＆ドロップ
  </div>
  <div class="mt-3" v-if="files">
    ファイル名
    <ul class="list-group">
      <div v-for="file in files" :key="file">
        <li class="list-group-item">{{ file.name }}</li>
      </div>
    </ul>
  </div>

  <div v-if="fileSize > 50000000" class="mt-2">
    <p>この量は変換に時間がかかるのでコーヒーでも飲んでお待ち下さい</p>
  </div>

  <div class="process mt-4">
    <div v-if="!processing && files">
      <button class="btn btn-outline-primary btn-lg" type="button" v-on:click='add_info'>処理開始</button>
    </div>
    <div v-else-if="!processing && !files">
      <button class="btn btn-outline-primary btn-lg" type="button" disabled v-on:click='add_info'>処理開始</button>
    </div>
    <div v-else>
      <button class="btn btn-outline-primary btn-lg" type="button" disabled v-on:click='add_info'>処理中</button>
      <p>処理中はブラウザは閉じないでください</p>
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
  width: 100%;
  height: 300px;
  border: 5px solid gray;
  border-radius: 15px;
}

.enter {
  border: 10px dotted powderblue;
}

.process {
  text-align: center
}

.process p {
  margin-top: 1rem;
  text-align: center;
}
</style>