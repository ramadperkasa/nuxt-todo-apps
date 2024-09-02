<template>
  <v-navigation-drawer floating :rail="!isRail" :permanent="isRail">
    <div
      :class="{
        'd-flex justify-center py-3 px-6': isRail,
        'd-flex justify-center py-2': !isRail,
      }"
    >
      <v-img
        contain
        src="https://cdn.techinasia.com/data/images/07347fd66ebd150c3f2eb10bf11c9f35.png"
        v-if="isRail"
      />
      <v-img contain src="@/assets/images/logo-square.png" v-else />
    </div>

    <v-list class="my-2">
      <v-list-item
        base-color="blue-grey-darken-4"
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        subtitle="ramadwiyantara1@gmail.com"
        title="Rama Dwiyantara Perkasa"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-subheader v-if="isRail">Menu</v-list-subheader>

      <v-list-item
        v-for="item in listMenu"
        :key="item.title"
        :prepend-icon="item.icon"
        base-color="blue-grey-darken-4"
        :title="item.title"
        @click="false"
        :active="item.active"
        color="primary"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-list nav>
      <v-list-subheader v-if="isRail">Languages</v-list-subheader>
      <v-list-item
        base-color="blue-grey-darken-4"
        v-for="item in ['English', 'Indonesia']"
        :key="item"
        @click="false"
        color="primary"
        :title="item"
      >
        <template v-slot:prepend>
          <v-img
            :src="
              item === 'English'
                ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNjQgNjQiPjxwYXRoIGZpbGw9IiNlZDRjNWMiIGQ9Ik00OCA2LjZDNDMuMyAzLjcgMzcuOSAyIDMyIDJ2NC42eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zMiAxMS4yaDIxLjZDNTEuOSA5LjUgNTAgNy45IDQ4IDYuNkgzMnoiLz48cGF0aCBmaWxsPSIjZWQ0YzVjIiBkPSJNMzIgMTUuOGgyNS4zYy0xLjEtMS43LTIuMy0zLjItMy42LTQuNkgzMnoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMzIgMjAuNGgyNy43Yy0uNy0xLjYtMS41LTMuMi0yLjQtNC42SDMyeiIvPjxwYXRoIGZpbGw9IiNlZDRjNWMiIGQ9Ik0zMiAyNWgyOS4yYy0uNC0xLjYtLjktMy4xLTEuNS00LjZIMzJ6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMyIDI5LjdoMjkuOWMtLjEtMS42LS40LTMuMS0uNy00LjZIMzJ6Ii8+PHBhdGggZmlsbD0iI2VkNGM1YyIgZD0iTTYxLjkgMjkuN0gzMlYzMkgyYzAgLjggMCAxLjUuMSAyLjNoNTkuOGMuMS0uOC4xLTEuNS4xLTIuM3MwLTEuNi0uMS0yLjMiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMi44IDM4LjloNTguNGMuNC0xLjUuNi0zIC43LTQuNkgyLjFjLjEgMS41LjMgMy4xLjcgNC42Ii8+PHBhdGggZmlsbD0iI2VkNGM1YyIgZD0iTTQuMyA0My41aDU1LjRjLjYtMS41IDEuMS0zIDEuNS00LjZIMi44Yy40IDEuNi45IDMuMSAxLjUgNC42Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTYuNyA0OC4xaDUwLjZjLjktMS41IDEuNy0zIDIuNC00LjZINC4zYy43IDEuNiAxLjUgMy4xIDIuNCA0LjYiLz48cGF0aCBmaWxsPSIjZWQ0YzVjIiBkPSJNMTAuMyA1Mi43aDQzLjRjMS4zLTEuNCAyLjYtMyAzLjYtNC42SDYuN2MxIDEuNyAyLjMgMy4yIDMuNiA0LjYiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTUuOSA1Ny4zaDMyLjJjMi4xLTEuMyAzLjktMi45IDUuNi00LjZIMTAuM2MxLjcgMS44IDMuNiAzLjMgNS42IDQuNiIvPjxwYXRoIGZpbGw9IiNlZDRjNWMiIGQ9Ik0zMiA2MmM1LjkgMCAxMS40LTEuNyAxNi4xLTQuN0gxNS45YzQuNyAzIDEwLjIgNC43IDE2LjEgNC43Ii8+PHBhdGggZmlsbD0iIzQyOGJjMSIgZD0iTTE2IDYuNmMtMi4xIDEuMy00IDIuOS01LjcgNC42Yy0xLjQgMS40LTIuNiAzLTMuNiA0LjZjLS45IDEuNS0xLjggMy0yLjQgNC42Yy0uNiAxLjUtMS4xIDMtMS41IDQuNmMtLjQgMS41LS42IDMtLjcgNC42Yy0uMS44LS4xIDEuNi0uMSAyLjRoMzBWMmMtNS45IDAtMTEuMyAxLjctMTYgNC42Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTI1IDNsLjUgMS41SDI3bC0xLjIgMWwuNCAxLjVsLTEuMi0uOWwtMS4yLjlsLjQtMS41bC0xLjItMWgxLjV6bTQgNmwuNSAxLjVIMzFsLTEuMiAxbC40IDEuNWwtMS4yLS45bC0xLjIuOWwuNC0xLjVsLTEuMi0xaDEuNXptLTggMGwuNSAxLjVIMjNsLTEuMiAxbC40IDEuNWwtMS4yLS45bC0xLjIuOWwuNC0xLjVsLTEuMi0xaDEuNXptNCA2bC41IDEuNUgyN2wtMS4yIDFsLjQgMS41bC0xLjItLjlsLTEuMi45bC40LTEuNWwtMS4yLTFoMS41em0tOCAwbC41IDEuNUgxOWwtMS4yIDFsLjQgMS41bC0xLjItLjlsLTEuMi45bC40LTEuNWwtMS4yLTFoMS41em0tOCAwbC41IDEuNUgxMWwtMS4yIDFsLjQgMS41bC0xLjItLjlsLTEuMi45bC40LTEuNWwtMS4yLTFoMS41em0yMCA2bC41IDEuNUgzMWwtMS4yIDFsLjQgMS41bC0xLjItLjlsLTEuMi45bC40LTEuNWwtMS4yLTFoMS41em0tOCAwbC41IDEuNUgyM2wtMS4yIDFsLjQgMS41bC0xLjItLjlsLTEuMi45bC40LTEuNWwtMS4yLTFoMS41em0tOCAwbC41IDEuNUgxNWwtMS4yIDFsLjQgMS41bC0xLjItLjlsLTEuMi45bC40LTEuNWwtMS4yLTFoMS41em0xMiA2bC41IDEuNUgyN2wtMS4yIDFsLjQgMS41bC0xLjItLjlsLTEuMi45bC40LTEuNWwtMS4yLTFoMS41em0tOCAwbC41IDEuNUgxOWwtMS4yIDFsLjQgMS41bC0xLjItLjlsLTEuMi45bC40LTEuNWwtMS4yLTFoMS41em0tOCAwbC41IDEuNUgxMWwtMS4yIDFsLjQgMS41bC0xLjItLjlsLTEuMi45bC40LTEuNWwtMS4yLTFoMS41em0yLjgtMTRsMS4yLS45bDEuMi45bC0uNS0xLjVsMS4yLTFoLTEuNUwxMyA5bC0uNSAxLjVoLTEuNGwxLjIuOXptLTggMTJsMS4yLS45bDEuMi45bC0uNS0xLjVsMS4yLTFINS41TDUgMjFsLS41IDEuNWgtMWMwIC4xLS4xLjItLjEuM2wuOC42eiIvPjwvc3ZnPg=='
                : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNjQgNjQiPjxwYXRoIGZpbGw9IiNmOWY5ZjkiIGQ9Ik0zMS44IDYyYzE2LjYgMCAzMC0xMy40IDMwLTMwaC02MGMwIDE2LjYgMTMuNCAzMCAzMCAzMCIvPjxwYXRoIGZpbGw9IiNlZDRjNWMiIGQ9Ik0zMS44IDJjLTE2LjYgMC0zMCAxMy40LTMwIDMwaDYwYzAtMTYuNi0xMy40LTMwLTMwLTMwIi8+PC9zdmc+'
            "
            width="24"
            class="mr-8"
          />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const props = defineProps({
  isRail: Boolean,
});

const listMenu = ref([
  {
    title: "Home",
    icon: "mdi-home",
    to: "/",
    active: true,
  },
  {
    title: "About",
    icon: "mdi-information",
    to: "/about",
    active: false,
  },
  {
    title: "Contact",
    icon: "mdi-email",
    to: "/contact",
    active: false,
  },
  {
    title: "Settings",
    icon: "mdi-cog",
    to: "/settings",
    active: false,
  },
  {
    title: "Customers",
    icon: "mdi-account",
    to: "/users",
    active: false,
  },
  {
    title: "Payments",
    icon: "mdi-credit-card",
    to: "/payments",
    active: false,
  },
  {
    title: "Reports",
    icon: "mdi-chart-bar",
    to: "/reports",
    active: false,
  },
  {
    title: "Catalog",
    icon: "mdi-view-list",
    to: "/catalog",
  },
  {
    title: "Orders",
    icon: "mdi-cart",
    to: "/orders",
  },
]);
</script>
<style lang="scss" scoped>
hr {
  border-top: 1px solid rgb(54, 127, 221);
  margin: 0px 12px;
}
</style>
