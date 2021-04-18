<template>
  <content-loader
      :width="414"
      :height="836"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="8" y="5" width="110" height="836" />
      <rect x="140" y="5" rx="0" ry="0" width="260" height="95" />
      <rect x="140" y="115" rx="0" ry="0" width="260" height="95" />
      <rect x="140" y="225" rx="0" ry="0" width="260" height="95" />
      <rect x="140" y="335" rx="0" ry="0" width="260" height="95" />
      <rect x="140" y="445" rx="0" ry="0" width="260" height="95" />
      <rect x="140" y="555" rx="0" ry="0" width="260" height="95" />
      <rect x="140" y="665" rx="0" ry="0" width="260" height="95" />
      <rect x="140" y="775" rx="0" ry="0" width="260" height="95" />

    </content-loader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  }
}
</script>
