<template>
  <div class="company-list">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading companies...</p>
    </div>
    
    <div v-else-if="companies.length === 0" class="empty-state">
      <svg viewBox="0 0 20 20" fill="currentColor" class="empty-icon">
        <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
      </svg>
      <h3>No companies found</h3>
      <p>Try adjusting your search terms or browse all companies</p>
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
            <h3 class="company-name">{{ company.name }}</h3>
            <div class="company-meta">
              <span v-if="company.industry" class="meta-item">{{ company.industry }}</span>
              <span v-if="company.headquarters" class="meta-item">{{ company.headquarters }}</span>
            </div>
          </div>
          <div class="company-actions">
            <button @click="startEdit(company)" class="edit-btn" title="Edit company">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
              </svg>
            </button>
            <a :href="company.career_url" target="_blank" class="career-link">
              View Jobs
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
  padding: 60px 20px;
  text-align: center;
  color: var(--text-muted);
}

.empty-state .empty-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-state h3 {
  margin: 0 0 8px 0;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 600;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-top: 2px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.companies-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.companies-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.company-card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  transition: all 0.2s;
}

.company-row {
  background: var(--bg-primary);
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
}

.company-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-hover);
}

.company-row:hover {
  background: var(--bg-hover);
}

.company-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 16px;
}

.company-info {
  flex: 1;
  min-width: 0;
}

.company-name {
  margin: 0 0 8px 0;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
}

.company-row .company-name {
  font-size: 15px;
  margin-bottom: 4px;
}

.company-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.company-row .company-meta {
  gap: 8px;
}

.meta-item {
  color: var(--text-secondary);
  font-size: 14px;
}

.company-row .meta-item {
  font-size: 13px;
}

.company-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}

.edit-btn {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 6px;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-btn svg {
  width: 14px;
  height: 14px;
}

.edit-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.career-link {
  background: var(--primary);
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: var(--radius);
  transition: all 0.2s;
  white-space: nowrap;
  font-size: 14px;
}

.company-row .career-link {
  padding: 6px 12px;
  font-size: 13px;
}

.career-link:hover {
  background: var(--primary-hover);
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.edit-input {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 14px;
  background: var(--bg-primary);
}

.edit-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
}

.edit-actions {
  display: flex;
  gap: 8px;
}

.save-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
}

.cancel-btn {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 13px;
}

@media (max-width: 768px) {
  .companies-grid {
    grid-template-columns: 1fr;
  }
  
  .company-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .company-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .company-actions {
    align-self: stretch;
  }
  
  .career-link {
    text-align: center;
    flex: 1;
  }
}
</style>