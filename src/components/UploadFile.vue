<script setup lang="ts">

import { ref } from 'vue'
let isEnter = ref(false)
let file = ref()

const dragEnter = () => isEnter.value = true
const dragLeave = () => isEnter.value = false
const dropFile = (e: DragEvent) => {
  file.value = e.dataTransfer!.files[0]
  isEnter.value = false
}
</script>

<template>
  <div class="drop_area" @dragenter="dragEnter" @dragleave="dragLeave" @dragover.prevent @drop.prevent="dropFile"
    :class="{enter: isEnter}">
    ファイルアップロード
  </div>
  <div v-if="file">
    ファイル名：{{ file.name }}
  </div>
  <div class="process mt-4">
  <button class="btn btn-outline-primary btn-lg" type="button">処理開始</button>
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
</style>