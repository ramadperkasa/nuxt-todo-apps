<template>
  <v-container>
    <v-btn color="primary" class="mb-4" @click="fetchTodos">
      Refresh Todos
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="todos"
      item-key="activities_no"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Todo List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="openAddTodoDialog">Add New Todo</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" dark>
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const todos = ref([
  {
    activities_no: "AC-0001",
    subject: "Learn Vue.js",
    description: "Start with Vue 3",
    status: "Unmarked",
  },
  {
    activities_no: "AC-0002",
    subject: "Build a project",
    description: "Build a project using Nuxt 3",
    status: "Done",
  },
]);

const headers = [
  { text: "Activity No", value: "activities_no" },
  { text: "Subject", value: "subject" },
  { text: "Description", value: "description" },
  { text: "Status", value: "status" },
];

const fetchTodos = () => {
  console.log("Fetching todos...");
};

const getStatusColor = (status) => {
  switch (status) {
    case "Done":
      return "green";
    case "Canceled":
      return "red";
    default:
      return "blue";
  }
};

const openAddTodoDialog = () => {
  console.log("Open Add Todo Dialog");
};
</script>
