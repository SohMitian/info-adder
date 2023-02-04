<script setup lang="ts">
import HeadlineTItle from "./components/HeadlineTItle.vue";
import UploadFile from './components/UploadFile.vue'
import FooterTitle from '@/components/FooterTitle.vue'
</script>

<template>
  <div class="container">
    <!-- ヘッドライン -->
    <header>
      <div class="wrapper">
        <HeadlineTItle />
      </div>
    </header>
    
    <!-- ファイルアップロード -->
    <div class="mt-4">
      <UploadFile />
    </div>

  </div>
  
  <!-- フッター -->
  <footer>
    <FooterTitle/>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
