<template>
  <div class="company-list">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading companies...</p>
    </div>
    
    <div v-else-if="companies.length === 0" class="empty-state">
      <p>No companies found</p>
    </div>
    
    <div v-else :class="viewMode === 'list' ? 'companies-list' : 'companies-grid'">
      <div
        v-for="company in companies"
        :key="company.id"
        :class="viewMode === 'list' ? 'company-row' : 'company-card'"
      >
        <div v-if="editingId === company.id" class="edit-form">
          <input v-model="editForm.name" placeholder="Company name" class="edit-input" />
          <input v-model="editForm.career_url" placeholder="Career URL" class="edit-input" />
          <input v-model="editForm.industry" placeholder="Industry" class="edit-input" />
          <input v-model="editForm.headquarters" placeholder="Headquarters" class="edit-input" />
          <div class="edit-actions">
            <button @click="saveEdit(company.id)" class="save-btn">Save</button>
            <button @click="cancelEdit" class="cancel-btn">Cancel</button>
          </div>
        </div>
        <div v-else class="company-content">
          <div class="company-info">
            <h4>{{ company.name }}</h4>
            <p v-if="company.industry" class="company-industry">{{ company.industry }}</p>
            <p v-if="company.headquarters" class="company-location">{{ company.headquarters }}</p>
          </div>
          <div class="company-actions">
            <button @click="startEdit(company)" class="edit-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m18 2 4 4-14 14H4v-4L18 2z"/>
                <path d="M14.5 5.5 18.5 9.5"/>
              </svg>
            </button>
            <a :href="company.career_url" target="_blank" class="career-link">
              View Careers
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Company } from '../types/company'

defineProps<{
  companies: Company[]
  loading: boolean
  viewMode: 'list' | 'cards'
}>()

const emit = defineEmits<{
  update: [id: number, data: { name: string; career_url: string; industry?: string; headquarters?: string }]
}>()

const editingId = ref<number | null>(null)
const editForm = ref({ name: '', career_url: '', industry: '', headquarters: '' })

const startEdit = (company: Company) => {
  editingId.value = company.id
  editForm.value = {
    name: company.name,
    career_url: company.career_url,
    industry: company.industry || '',
    headquarters: company.headquarters || ''
  }
}

const saveEdit = (id: number) => {
  emit('update', id, editForm.value)
  editingId.value = null
}

const cancelEdit = () => {
  editingId.value = null
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

@media (max-width: 768px) {
  .companies-grid {
    grid-template-columns: 1fr;
  }
  
  .company-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}

.companies-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.companies-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.company-card {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-lg);
}

.company-row {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
}

.company-card:hover,
.company-row:hover {
  border-color: var(--primary);
  background: var(--white);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.15);
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

.company-row .company-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.company-industry {
  margin: 0 0 0.25rem 0;
  color: var(--gray-700);
  font-size: 0.875rem;
}

.company-row .company-industry {
  margin: 0;
  display: inline;
}

.company-row .company-industry::before {
  content: ' • ';
  color: var(--gray-400);
}

.company-location {
  margin: 0;
  color: var(--gray-500);
  font-size: 0.875rem;
}

.company-row .company-location {
  display: inline;
}

.company-row .company-location::before {
  content: ' • ';
  color: var(--gray-400);
}

.career-link {
  background: linear-gradient(135deg, var(--success), #22c55e);
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
}

.company-row .career-link {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.career-link:hover {
  background: linear-gradient(135deg, #15803d, #16a34a);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
}

.company-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.company-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.edit-btn {
  background: var(--primary);
  color: var(--white);
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-btn svg {
  width: 16px;
  height: 16px;
}

.edit-btn:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.edit-input {
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: 6px;
  font-size: 0.875rem;
  background: var(--white);
}

.edit-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.edit-actions {
  display: flex;
  gap: 0.5rem;
}

.save-btn {
  background: var(--success);
  color: var(--white);
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
}

.cancel-btn {
  background: var(--gray-500);
  color: var(--white);
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .company-actions {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
  
  .edit-actions {
    flex-direction: column;
  }
}
</style>