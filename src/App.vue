<script setup>

import { ref, computed } from 'vue';

import ColorScheme from './ColorScheme.vue'
import schemes from '../data/schemes.json';

const form = ref(null);

const urlParams = new URLSearchParams(window.location.search);
const selectedScheme = ref('');
if (urlParams.has('s')) {
  selectedScheme.value = urlParams.get('s');
} else {
  selectedScheme.value = schemes.length > 0 ? schemes[0].name : '';
}
const currentScheme = computed(() => {
  return schemes.find((s) => s.name === selectedScheme.value);
});

const submit = (event) => {
  form.value.submit();
}

</script>

<template>
  <div class="flow">
    <form class="form-group flow--small" @change="submit" ref="form">
      <label for="scheme">Scheme</label>
      <select name="s" id="scheme">
        <option v-for="scheme in schemes" :selected="scheme.name === selectedScheme">{{ scheme.name }}</option>
      </select>
    </form>

    <color-scheme v-if="currentScheme" :name="currentScheme.name" :colors="currentScheme.colors"></color-scheme>
  </div>
</template>
