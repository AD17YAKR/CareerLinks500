<template>
  <div class="search-page">
    <div class="container">
      <div class="header-section">
        <h1>Fortune 500 Companies</h1>
        <p>{{ totalCount }} companies with career opportunities</p>
      </div>
      
      <div class="controls-section">
        <div class="top-controls">
          <SearchBar @search="handleSearch" />
          
          <div class="right-controls">
            <div class="view-toggle">
              <button 
                @click="viewMode = 'list'" 
                :class="['toggle-btn', { active: viewMode === 'list' }]"
              >
                List
              </button>
              <button 
                @click="viewMode = 'cards'" 
                :class="['toggle-btn', { active: viewMode === 'cards' }]"
              >
                Grid
              </button>
            </div>
            
            <CompanyControls 
              v-if="!loading && companies.length > 0"
              :current-page="currentPage"
              :total-count="totalCount"
              :sort-by="sortBy"
              :sort-order="sortOrder"
              @sort="handleSort"
              @page="handlePageChange"
              :show-pagination="false"
            />
          </div>
        </div>
        
        <div v-if="!loading && companies.length > 0 && totalPages > 1" class="pagination-controls">
          <button @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1" class="page-btn">‹</button>
          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
          <button @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages" class="page-btn">›</button>
        </div>
      </div>
      
      <div v-if="error" class="error-banner">
        {{ error }}
        <button @click="retry" class="retry-btn">Try Again</button>
      </div>
      
      <CompanyList :companies="companies" :loading="loading" :view-mode="viewMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useCompanies } from '../composables/useCompanies'
import SearchBar from '../components/SearchBar.vue'
import CompanyList from '../components/CompanyList.vue'
import CompanyControls from '../components/CompanyControls.vue'

const { companies, loading, error, search, totalCount, currentPage, sortBy, sortOrder, setSorting } = useCompanies()

const totalPages = computed(() => Math.ceil(totalCount.value / 20))
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

const retry = () => {
  search(currentQuery.value, 1)
}

onMounted(() => {
  search('')
})
</script>

<style scoped>
.search-page {
  min-height: calc(100vh - 100px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-section {
  margin-bottom: 32px;
}

.header-section h1 {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text-primary);
}

.header-section p {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
}

.controls-section {
  margin-bottom: 32px;
}

.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
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

.view-toggle {
  display: flex;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.toggle-btn {
  padding: 8px 16px;
  border: none;
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: var(--bg-hover);
}

.toggle-btn.active {
  background: var(--primary);
  color: white;
}

.toggle-btn + .toggle-btn {
  border-left: 1px solid var(--border);
}

.error-banner {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  color: #c53030;
  padding: 12px 16px;
  border-radius: var(--radius);
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.retry-btn {
  background: #c53030;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 12px;
}

.retry-btn:hover {
  background: #9c2626;
}

@media (max-width: 768px) {
  .header-section h1 {
    font-size: 24px;
  }
  
  .top-controls {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .right-controls {
    justify-content: space-between;
  }
  
  .error-banner {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
</style>