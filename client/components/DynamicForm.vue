<script setup>
import { reactive, computed, watch } from 'vue';
import { useQuasar, QInput, QSelect, QCheckbox, QRadio, QOptionGroup, QDate, QTime, QFile, QIcon, QAvatar, QForm, QBtn } from 'quasar';

// --- Props and Emits ---
const props = defineProps({
  formFields: { type: Array, required: true, default: () => [] },
  submitLabel: { type: String, default: 'Submit' },
  submitButton: { type: Boolean, default: false },
  notify: { type: Boolean, default: false },
  modelValue: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['submit', 'update:modelValue']);

const $q = useQuasar();

// --- Reactive Form Data ---
const formData = reactive({});

// Initialize and process form data
const initFormData = (data) => {
  Object.assign(formData, data);
  props.formFields.forEach((field) => {
    if (['checkbox', 'checks'].includes(field.type)) {
      formData[field.name] = Array.isArray(formData[field.name]) ? formData[field.name] : [];
    } else if (['date', 'qdate'].includes(field.type) && typeof formData[field.name] === 'string' && formData[field.name].includes(' ')) {
      const [datePart] = formData[field.name].split(' ');
      const [day, month, year] = datePart.split('-');
      formData[field.name] = `${year}-${month}-${day}`;
    } else if (['time', 'qtime'].includes(field.type) && typeof formData[field.name] === 'string' && formData[field.name].includes(' ')) {
      formData[field.name] = formData[field.name].split(' ')[1].substring(0, 5);
    }
  });
};

// Sync modelValue changes
watch(
  () => props.modelValue,
  (val) => initFormData(val),
  { immediate: true, deep: true }
);
watch(formData, (val) => emit('update:modelValue', { ...val }), { deep: true });

// --- Component Mapping ---
const componentMap = {
  text: QInput,
  email: QInput,
  password: QInput,
  number: QInput,
  textarea: QInput,
  date: QInput,
  time: QInput,
  select: QSelect,
  checkbox: QOptionGroup,
  radio: QOptionGroup,
  checks: QCheckbox,
  qdate: QDate,
  qtime: QTime,
  file: QFile,
  toggle: QRadio,
};

// --- Validation ---
const isFormInvalid = computed(() => props.formFields.some((field) => field.required && !formData[field.name]));

const getRules = (field) => {
  const rules = [];
  if (field.regex) rules.push((val) => new RegExp(field.regex).test(val) || 'Invalid format');
  if (field.maxSize && field.type === 'file')
    rules.push((files) => {
      if (!files) return true;
      const fileArray = Array.isArray(files) ? files : [files];
      const maxSizeMB = (field.maxSize / 1024 / 1024).toFixed(2);
      return fileArray.every((file) => file.size <= field.maxSize) || `File exceeds ${maxSizeMB} MB`;
    });
  if (field.rules) rules.push(...(Array.isArray(field.rules) ? field.rules : [field.rules]));
  return rules;
};

// --- Event Handlers ---
const onSubmit = () => {
  emit('submit', { ...formData });
  if (props.notify) {
    $q.notify({ type: 'positive', message: 'Form submitted!', position: 'top' });
  }
};

// --- Option Filtering ---
const filterOptions = (val, update, field) => {
  if (!field.options) return update(() => {});
  update(() => {
    field.filteredOptions = val ? field.options.filter((opt) => String(opt).toLowerCase().includes(val.toLowerCase())) : field.options;
  });
};
</script>

<template>
  <QForm @submit="onSubmit" class="space-y-2">
    <slot name="before" />
    <div v-for="field in formFields" :key="field.name">
      <label v-if="['checkbox', 'radio', 'toggle'].includes(field.type)" class="block text-sm text-gray-600 mb-1">
        {{ field.label }}
      </label>
      <!-- @filter="(val, update) => field.inputFilter && filterOptions(val, update, field)" -->

      <component
        :is="componentMap[field.type] || QInput"
        v-model="formData[field.name]"
        v-bind="field"
        :options="field.inputFilter ? field.filteredOptions || field.options : field.options"
        :rules="getRules(field)"
        :label="['checkbox', 'radio', 'toggle'].includes(field.type) ? undefined : field.label"
        :option-value="field.optionValue || 'value'"
        :option-label="field.optionLabel || 'label'"
      >
        <template v-if="field.prependIcon" #prepend><Icon :name="field.prependIcon" /></template>
        <template v-if="field.appendIcon" #append><Icon :name="field.appendIcon" /></template>
        <template v-if="field.afterIcon" #after><Icon :name="field.afterIcon" /></template>
        <template v-if="field.beforeIcon" #before><Icon :name="field.beforeIcon" /></template>
        <template v-if="field.beforeImg" #before
          ><QAvatar><img :src="field.beforeImg" alt="avatar" /></QAvatar
        ></template>
      </component>
    </div>
    <slot name="after" />
    <QBtn
      v-if="submitButton"
      :label="submitLabel || 'Submit'"
      type="submit"
      color="primary"
      :disable="isFormInvalid"
      class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
    />
  </QForm>
</template>
