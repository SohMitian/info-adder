<script setup lang="ts">
import InfoItem from "./InfoItem.vue";
import PostalIcon from './icons/IconPostal.vue'
import TrainIcon from './icons/IconTrain.vue'
import AddressIcon from './icons/IconAddress.vue'
import FacilitiesIcon from './icons/IconFacilities.vue'
import { ref } from 'vue'

let selectedData = ref([false, false, false])

const switchSelectData = (index: number) => {
  selectedData.value[index] = !selectedData.value[index]
}

</script>

<template>
  <InfoItem @click="switchSelectData(0)">
    <template #icon>
      <PostalIcon/>
    </template>
    <template #heading>郵便番号</template>
    建物の郵便番号を付与します<br/>
    例：100-001
  </InfoItem>

  <InfoItem @click="switchSelectData(1)">
    <template #icon>
      <AddressIcon />
    </template>
    <template #heading>所在</template>
    PLATEAUにデフォルトで備わっている住所よりも細かい値を付与できます
    <br />
    例：千代田区丸の内1-9-1
  </InfoItem>

  <InfoItem @click="switchSelectData(2)">
    <template #icon>
      <TrainIcon />
    </template>
    <template #heading>最寄り駅</template>
    最寄り駅の名前、駅までの距離、駅の路線を付与します<br/>
    例：東京、60m、山の手
  </InfoItem>

  <InfoItem @click="switchSelectData(3)">
    <template #icon>
      <FacilitiesIcon />
    </template>
    <template #heading>周囲の施設</template>
    建物の周囲に存在する施設情報を最大20件付与します<br/>
    例：ローソン 有楽町一丁目店、35.674688 139.7614977
  </InfoItem>
</template>