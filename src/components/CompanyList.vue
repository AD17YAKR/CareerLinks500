<template>
  <div class="company-list">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading companies...</p>
    </div>
    
    <div v-else-if="companies.length === 0" class="empty-state">
      <p>No companies found</p>
    </div>
    
    <div v-else class="companies-grid">
      <div
        v-for="company in companies"
        :key="company.id"
        class="company-card"
      >
        <div class="company-info">
          <h4>{{ company.name }}</h4>
          <p v-if="company.industry" class="company-industry">{{ company.industry }}</p>
          <p v-if="company.headquarters" class="company-location">{{ company.headquarters }}</p>
        </div>
        <a :href="company.career_url" target="_blank" class="career-link">
          View Careers
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Company } from '../types/company'

defineProps<{
  companies: Company[]
  loading: boolean
}>()

const formatUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname
    return domain.replace('www.', '')
  } catch {
    return url
  }
}
</script>

<style scoped>
.company-list {
  min-height: 200px;
}

.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: var(--gray-500);
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--gray-200);
  border-top: 2px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.companies-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.company-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.2s;
  box-shadow: var(--shadow);
}

.company-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.company-info {
  flex: 1;
}

.company-info h4 {
  margin: 0 0 0.5rem 0;
  color: var(--gray-900);
  font-size: 1.1rem;
  font-weight: 600;
}

.company-industry {
  margin: 0 0 0.25rem 0;
  color: var(--gray-700);
  font-size: 0.875rem;
}

.company-location {
  margin: 0;
  color: var(--gray-500);
  font-size: 0.875rem;
}

.career-link {
  background: var(--success);
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
  white-space: nowrap;
}

.career-link:hover {
  background: #15803d;
  transform: translateY(-1px);
}
</style>