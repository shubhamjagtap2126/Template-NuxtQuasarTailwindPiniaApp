<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const inputValue = ref("");
const retrievedValue = ref(null);
const dataType = ref(null);

const saveToLocalStorage = () => {
  $q.localStorage.set("myKey", inputValue.value);
  $q.notify({
    message: "Value saved!",
    color: "positive",
    position: "top",
  });
};

const getFromLocalStorage = () => {
  retrievedValue.value = $q.localStorage.getItem("myKey");
  if (retrievedValue.value !== null) {
    try {
      const parsed = JSON.parse(JSON.stringify(retrievedValue.value)); //force string to json, if it is already json.
      console.log(parsed);
      if (typeof parsed === "object" && parsed !== null) {
        dataType.value = "Object";
        retrievedValue.value = JSON.stringify(parsed, null, 2);
      } else {
        dataType.value = "String";
        retrievedValue.value = retrievedValue.value;
      }

      $q.notify({
        message: "Data retrieved!",
        color: "positive",
        position: "top-right",
      });
    } catch (e) {
      dataType.value = "String";
      retrievedValue.value = retrievedValue.value;
      $q.notify({
        message: "String data retrieved!",
        color: "positive",
        position: "top",
      });
    }
  } else {
    dataType.value = "No data found";
    retrievedData.value = "No data found";
    $q.notify({
      message: "No data found",
      color: "warning",
      position: "top",
    });
  }
};
</script>

<template>
  <div>
    <q-input v-model="inputValue" label="Enter Value" />
    <q-btn class="q-ma-sm" @click="saveToLocalStorage" label="Save" color="primary" />
    <q-btn class="q-ma-sm" @click="getFromLocalStorage" label="Get" color="secondary" />
    <div v-if="retrievedValue">Retrieved Value: {{ retrievedValue }}</div>
  </div>
</template>
