<template>
  <v-app>
    <NuxtLayout>
      <v-main class="d-flex background-main" style="min-height: 100vh">
        <v-container fluid>
          <NuxtPage />
        </v-container>
      </v-main>
    </NuxtLayout>
  </v-app>
</template>

<style lang="scss" scoped>
.background-main {
  background-color: #e6edf7;
}
</style>
