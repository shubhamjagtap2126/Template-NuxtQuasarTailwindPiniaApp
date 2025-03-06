<!------------------------------- Setup Script ------------------------------------->
<script setup>
useHead({ title: "Home" });

import { useCounterStore } from "../stores/stores";
const counter = useCounterStore();

const { data: users } = await useFetch("https://jsonplaceholder.typicode.com/users");
</script>

<!------------------------------- Template Render ------------------------------------->
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Welcome to Nuxt Quasar SPA!</h1>
    <p class="mt-2">This is the home page.</p>
  </div>

  <HelloWorld />

  <Quasar />

  <div class="p-4 bg-gray-200 card rounded m-4">
    <h1 class="text-2xl font-bold">Counter Page</h1>
    <p class="mt-2">Count: {{ counter.count }}</p>
    <p class="mt-2">Double: {{ counter.doubleCount }}</p>
    <q-btn @click="counter.increment">Increment</q-btn>
    <q-btn @click="counter.decrement">Decrement</q-btn>
  </div>

  <div class="p-4 bg-gray-200 card rounded m-4">
    <div class="text-2xl font-bold">Users</div>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<!-------------------------------  CSS  ------------------------------------->
<style scoped></style>
