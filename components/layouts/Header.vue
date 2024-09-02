<template>
  <v-app-bar :order="0" flat>
    <v-btn icon @click="handleToggleRail()">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <div class="d-flex w-100 mx-5" style="gap: 18px">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        density="compact"
        label="Search Something..."
        variant="solo"
        hide-details
        single-line
        flat
      ></v-text-field>

      <v-btn icon>
        <v-icon color="blue-grey-lighten-1">mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="blue-grey-lighten-1">mdi-email</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="blue-grey-lighten-1">mdi-account</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
const props = defineProps({
  isRail: Boolean,
});

const emit = defineEmits(["onToggleRail"]);

const handleToggleRail = () => {
  emit("onToggleRail", !props.isRail);
};
</script>
