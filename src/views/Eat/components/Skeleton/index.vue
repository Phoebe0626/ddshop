<template>
  <content-loader
    :width="414"
    :height="834"
    :speed="2"
  >
    <rect x="8" y="0" width="150" height="30" />
    <rect x="8" y="36" width="385" height="30" />
    <rect x="8" y="75" width="190" height="150" />
    <rect x="210" y="75" width="190" height="150" />
    <rect x="8" y="230" width="190" height="25" />
    <rect x="210" y="230" width="190" height="25" />
    <rect x="8" y="260" rx="18" ry="18" width="36" height="36" />
    <rect x="50" y="264" width="100" height="30" />
    <rect x="260" y="264" width="100" height="30" />
    <rect x="210" y="260" rx="18" ry="18" width="36" height="36" />

    <rect x="8" y="315" width="190" height="150" />
    <rect x="210" y="315" width="190" height="150" />
    <rect x="8" y="470" width="190" height="25" />
    <rect x="210" y="470" width="190" height="25" />
    <rect x="8" y="500" rx="18" ry="18" width="36" height="36" />
    <rect x="50" y="504" width="100" height="30" />
    <rect x="260" y="504" width="100" height="30" />
    <rect x="210" y="500" rx="18" ry="18" width="36" height="36" />

    <rect x="8" y="555" width="190" height="150" />
    <rect x="210" y="555" width="190" height="150" />
    <rect x="8" y="710" width="190" height="25" />
    <rect x="210" y="710" width="190" height="25" />
    <rect x="8" y="740" rx="18" ry="18" width="36" height="36" />
    <rect x="50" y="744" width="100" height="30" />
    <rect x="260" y="744" width="100" height="30" />
    <rect x="210" y="700" rx="18" ry="18" width="36" height="36" />

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
