<script setup>
// import { ref, reactive } from 'vue';
useHead({ title: 'Home' });
// const count = ref(0)
// defineProps({ msg: String })
// const signFormValues = reactive({ })
// const onSubmit = () => { console.log('Submit'); }
// const onReset = () => { console.log('onRecet'); }
</script>

<template>
  <div>
    <h3 class="text-6xl font-bold font-fredoka text-red-600 underline">Page</h3>
    <h1 class="text-2xl font-bold underline">Hello world!</h1>
    <q-btn color="primary" label="Primary" />
    <QBtn color="secondary" label="Secondary" />
    <LazyQBtn color="amber" class="text-black" label="Amber" />
  </div>
</template>

<style scoped></style>
