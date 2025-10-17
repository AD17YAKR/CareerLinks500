<template>
  <div class="search-bar">
    <div class="search-wrapper">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input
        v-model="query"
        @input="onSearch"
        type="text"
        placeholder="Search companies..."
        class="search-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const query = ref('')
const emit = defineEmits<{
  search: [query: string]
}>()

const onSearch = () => {
  emit('search', query.value)
}
</script>

<style scoped>
.search-bar {
  margin-bottom: 2rem;
}

.search-wrapper {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--gray-500);
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  font-size: 1rem;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  background: var(--white);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15), 0 8px 25px rgba(37, 99, 235, 0.1);
  transform: translateY(-2px);
}
</style>