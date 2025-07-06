<template>
  <div class="min-h-screen flex flex-center items-center justify-center bg-gradient-to-br from-red-400 to-purple-600 p-4 sm:p-6">
    <q-card class="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center transform transition-all duration-500 hover:scale-105" flat bordered>
      <q-card-section class="q-py-md">
        <div class="text-8xl font-bold text-red-600 leading-none mb-4">
          {{ error.statusCode || 'Error' }}
        </div>
        <div class="text-4xl text-gray-700 opacity-80 mb-3">
          {{ error.statusMessage || 'Something went wrong!' }}
        </div>
        <p class="text-lg text-gray-600 leading-relaxed overflow-auto">
          {{ error.message || 'An unexpected error occurred. We apologize for the inconvenience.' }}
        </p>
      </q-card-section>

      <q-separator inset class="my-6" />

      <q-card-actions class="q-px-md q-pt-sm flex justify-center gap-4">
        <q-btn
          icon="home"
          label="Go Home"
          to="/"
          color="primary"
          rounded
          outline
          size="md"
          class="px-6 py-3 transition-all duration-300 hover:shadow-md border-2 border-primary"
          @click="clearNuxtError"
        />
        <q-btn
          icon="arrow_back"
          label="Go Back"
          color="primary"
          rounded
          size="md"
          class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
          @click="goBackAndClearError"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
// Define props to receive the error object from Nuxt
const props = defineProps({
  error: {
    type: Object,
    required: true, // Error object is always provided by Nuxt
  },
});

const router = useRouter();

// Function to navigate home and clear the error
const clearNuxtError = () => {
  clearError({ redirect: '/' });
};

// Function to go back and clear the error, only if not on root and not 404
const goBackAndClearError = () => {
  // Only try to go back if the current path isn't '/'
  // and the error isn't a 404 (as going back from a non-existent page might just lead to another error)
  if (router.options.history.state.back && props.error.statusCode !== 404) {
    router.back();
    clearError(); // Clear the error state after navigating back
  } else {
    // Fallback to home if no history or 404
    clearNuxtError();
  }
};

// You can add more complex error logging here if needed
// For example: onMounted(() => console.error('Caught global error:', props.error));
</script>

<style scoped>
/* No additional custom styles needed; Tailwind and Quasar handle it. */
</style>
