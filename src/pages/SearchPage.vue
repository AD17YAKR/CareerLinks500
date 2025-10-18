<template>
  <div class="search-page">
    <div class="section">
      <SearchBar @search="handleSearch" />
      <div class="view-controls">
        <button 
          @click="viewMode = 'list'" 
          :class="['view-btn', { active: viewMode === 'list' }]"
        >
          List
        </button>
        <button 
          @click="viewMode = 'cards'" 
          :class="['view-btn', { active: viewMode === 'cards' }]"
        >
          Cards
        </button>
      </div>
      <CompanyControls 
        :current-page="currentPage"
        :total-count="totalCount"
        :sort-by="sortBy"
        :sort-order="sortOrder"
        @sort="handleSort"
        @page="handlePageChange"
      />
      <CompanyList :companies="companies" :loading="loading" :view-mode="viewMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCompanies } from '../composables/useCompanies'
import SearchBar from '../components/SearchBar.vue'
import CompanyList from '../components/CompanyList.vue'
import CompanyControls from '../components/CompanyControls.vue'

const { companies, loading, search, totalCount, currentPage, sortBy, sortOrder, setSorting } = useCompanies()
const viewMode = ref('list')
const currentQuery = ref('')

const handleSearch = (query: string) => {
  currentQuery.value = query
  search(query)
}

const handleSort = (field: string, order: 'asc' | 'desc') => {
  setSorting(field, order)
  search(currentQuery.value, 1)
}

const handlePageChange = (page: number) => {
  search(currentQuery.value, page)
}

onMounted(() => {
  search('')
})
</script>

<style scoped>
.search-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section {
  background: var(--white);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow);
}

.view-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: flex-end;
}

.view-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  background: var(--white);
  color: var(--gray-700);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.view-btn:hover {
  background: var(--gray-50);
}

.view-btn.active {
  background: var(--primary);
  color: var(--white);
  border-color: var(--primary);
}

@media (max-width: 768px) {
  .section {
    padding: 1.5rem;
  }
}
</style>