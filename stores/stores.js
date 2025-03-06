import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  // State
  const count = ref(0);

  // Actions
  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  // Getters (optional)
  const doubleCount = computed(() => count.value * 2);

  return { count, increment, decrement, doubleCount };
});
