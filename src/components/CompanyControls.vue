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
    
    <div v-if="showPagination !== false && totalPages > 1" class="pagination">
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
  showPagination?: boolean
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
  align-items: center;
  gap: 16px;
}

.sort-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  font-size: 14px;
  color: var(--text-primary);
}

.sort-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-btn {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: var(--bg-hover);
}

.page-btn:disabled {
  color: var(--text-muted);
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 8px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .sort-select {
    width: 100%;
  }
}
</style>