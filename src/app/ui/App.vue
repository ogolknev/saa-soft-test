<script setup lang="ts">
import { AccountManagementWidget } from '@/widgets'
</script>

<template>
  <v-app theme="dark">
    <v-main max-height="100dvh">
      <AccountManagementWidget />
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  overflow: hidden;
}
</style>
