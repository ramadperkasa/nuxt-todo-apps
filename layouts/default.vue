<template>
  <v-layout class="rounded rounded-md">
    <LayoutsSidebar :isRail="isRail" />

    <LayoutsHeader @onToggleRail="(val) => (isRail = val)" :isRail="isRail" />

    <slot />
  </v-layout>
</template>
<script setup lang="ts">
const isRail = ref(true);
</script>
