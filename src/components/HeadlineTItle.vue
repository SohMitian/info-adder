<script setup lang="ts">
</script>

<template>
  <div class="greetings">
    <h1 class="blue"></h1>
    <h1>
      法務省登記所備付地図データ（地図XML）をGeoJSONに変換するコンバータ
    </h1>
    <p>注意：容量の大きなファイルや同時に複数のファイルは変換に時間がかかります。
      処理が完了すると自動的にダウンロードされますので、ブラウザを閉じずに（別タブの使用はOK）お待ち下さい。
    なお、30分以上経過してもダウンロードされない場合は、<a href="https://twitter.com/soh_mitian" target="_blank">運営者
      </a>までご連絡いただけると対応できるかもしれません。</p>
  </div>

        <div class="alert alert-success" role="alert">
          <span class="badge bg-success">実装</span><small> 2023/1/29</small>
          <br />
          変換できなかった際にメッセージが表示されるように修正
        </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.3rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
