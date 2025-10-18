<template>
  <div class="controls">
    <div class="sort-controls">
      <select v-model="selectedSort" @change="onSortChange" class="sort-select">
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="industry-asc">Industry A-Z</option>
        <option value="industry-desc">Industry Z-A</option>
      </select>
    </div>
    
    <div v-if="totalPages > 1" class="pagination">
      <button @click="$emit('page', currentPage - 1)" :disabled="currentPage === 1" class="page-btn">‹</button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="$emit('page', currentPage + 1)" :disabled="currentPage === totalPages" class="page-btn">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  currentPage: number
  totalCount: number
  sortBy: string
  sortOrder: string
}>()

const emit = defineEmits<{
  sort: [field: string, order: 'asc' | 'desc']
  page: [page: number]
}>()

const selectedSort = ref(`${props.sortBy}-${props.sortOrder}`)
const totalPages = computed(() => Math.ceil(props.totalCount / 20))

const onSortChange = () => {
  const [field, order] = selectedSort.value.split('-')
  emit('sort', field, order as 'asc' | 'desc')
}

watch(() => [props.sortBy, props.sortOrder], () => {
  selectedSort.value = `${props.sortBy}-${props.sortOrder}`
})
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.sort-select {
  padding: 0.5rem;
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  background: var(--glass-bg);
  backdrop-filter: blur(5px);
  font-size: 0.875rem;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-btn {
  background: var(--primary);
  color: var(--white);
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.page-btn:disabled {
  background: var(--gray-300);
  cursor: not-allowed;
}

.page-info {
  font-size: 0.875rem;
  color: var(--gray-700);
  font-weight: 500;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>