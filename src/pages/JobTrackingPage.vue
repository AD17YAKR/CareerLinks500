<template>
  <div class="job-tracking-page">
    <div class="container">
      <div class="header-section">
        <div class="header-content">
          <div>
            <h1>Job Applications</h1>
            <p>Track your job application status and progress</p>
          </div>
          <div class="header-actions">
            <select v-model="statusFilter" class="filter-select">
              <option value="all">All Status</option>
              <option value="seeking_referral">Seeking Referral</option>
              <option value="referred_not_applied">Referred but Not Applied</option>
              <option value="referred_and_applied">Referred and Applied</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search applications..."
              class="search-input"
            />
            <button @click="exportToExcel" class="export-btn">
              Export to Excel
            </button>
            <button @click="showAddForm = !showAddForm" class="add-job-btn">
              {{ showAddForm ? 'Cancel' : 'Add Job' }}
            </button>
          </div>
        </div>
      </div>
      
      <AddJobForm 
        v-if="showAddForm" 
        @cancel="showAddForm = false" 
        @success="onJobAdded"
      />
      
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading applications...</p>
      </div>
      
      <div v-else-if="applications.length === 0" class="empty-state">
        <h3>No applications yet</h3>
        <p>Start tracking your job applications by adding them from company pages</p>
        <router-link to="/" class="cta-btn">Browse Companies</router-link>
      </div>
      
      <div v-else class="applications-container">
        <div v-if="activeApplications.length > 0" class="applications-section">
          <h2>Active Applications</h2>
          <div class="applications-list">
            <div
              v-for="application in activeApplications"
              :key="application.id"
              class="application-card"
            >
          <div class="application-info">
            <h3>{{ application.company?.name }}</h3>
            <p v-if="application.position" class="position">{{ application.position }}</p>
            <div class="meta">
              <span class="status-badge" :class="`status-${application.status.replace('_', '-')}`">
                {{ formatStatus(application.status) }}
              </span>
              <span class="industry">{{ application.company?.industry }}</span>
              <span class="date">Added: {{ formatDate(application.created_at) }}</span>
              <span v-if="application.applied_date" class="date">Applied: {{ formatDate(application.applied_date) }}</span>
            </div>
            <a v-if="application.job_link" :href="application.job_link" target="_blank" class="job-link">
              View Job Posting
            </a>
            <div v-if="application.referrer_name" class="referrer-info">
              <span class="referrer-label">Referred by:</span>
              <span class="referrer-name">{{ application.referrer_name }}</span>
              <a v-if="application.referrer_linkedin" :href="application.referrer_linkedin" target="_blank" class="referrer-linkedin">
                LinkedIn
              </a>
            </div>
            <p v-if="application.notes" class="notes">{{ application.notes }}</p>
          </div>
          
          <div class="application-actions">
            <select
              :value="application.status"
              @change="updateStatus(application.id, $event.target.value)"
              class="status-select"
            >
              <option value="seeking_referral">Seeking Referral</option>
              <option value="referred_not_applied">Referred but Not Applied</option>
              <option value="referred_and_applied">Referred and Applied</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
            
            <button @click="deleteApp(application.id)" class="delete-btn" title="Delete application">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
          </div>
        </div>
        
        <div v-if="archivedApplications.length > 0" class="applications-section archived-section">
          <h2>Archived Applications (30+ days old)</h2>
          <div class="applications-list">
            <div
              v-for="application in archivedApplications"
              :key="application.id"
              class="application-card archived-card"
            >
              <div class="application-info">
                <h3>{{ application.company?.name }}</h3>
                <p v-if="application.position" class="position">{{ application.position }}</p>
                <div class="meta">
                  <span class="industry">{{ application.company?.industry }}</span>
                  <span class="date">Added: {{ formatDate(application.created_at) }}</span>
                  <span v-if="application.applied_date" class="date">Applied: {{ formatDate(application.applied_date) }}</span>
                </div>
                <a v-if="application.job_link" :href="application.job_link" target="_blank" class="job-link">
                  View Job Posting
                </a>
                <div v-if="application.referrer_name" class="referrer-info">
                  <span class="referrer-label">Referred by:</span>
                  <span class="referrer-name">{{ application.referrer_name }}</span>
                  <a v-if="application.referrer_linkedin" :href="application.referrer_linkedin" target="_blank" class="referrer-linkedin">
                    LinkedIn
                  </a>
                </div>
                <p v-if="application.notes" class="notes">{{ application.notes }}</p>
              </div>
              
              <div class="application-actions">
                <select
                  :value="application.status"
                  @change="updateStatus(application.id, $event.target.value)"
                  class="status-select"
                >
                  <option value="seeking_referral">Seeking Referral</option>
                  <option value="referred_not_applied">Referred but Not Applied</option>
                  <option value="referred_and_applied">Referred and Applied</option>
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                  <option value="withdrawn">Withdrawn</option>
                </select>
                
                <button @click="deleteApp(application.id)" class="delete-btn" title="Delete application">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useJobTracking } from '../composables/useJobTracking'
import AddJobForm from '../components/AddJobForm.vue'
import type { JobStatus } from '../types/jobTracking'
import * as XLSX from 'xlsx'

const { user } = useAuth()
const { applications, loading, loadApplications, updateApplication, deleteApplication } = useJobTracking()
const showAddForm = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')

const filteredApplications = computed(() => {
  let filtered = applications.value
  
  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(app => app.status === statusFilter.value)
  }
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(app => 
      app.company?.name.toLowerCase().includes(query) ||
      app.position?.toLowerCase().includes(query) ||
      app.status.toLowerCase().includes(query) ||
      app.notes?.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

const activeApplications = computed(() => {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  return filteredApplications.value
    .filter(app => new Date(app.created_at) > thirtyDaysAgo)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})

const archivedApplications = computed(() => {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  return filteredApplications.value
    .filter(app => new Date(app.created_at) <= thirtyDaysAgo)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})

const updateStatus = async (id: number, status: JobStatus) => {
  try {
    await updateApplication(id, { status })
    if (user.value) {
      await loadApplications(user.value.id)
    }
  } catch (err) {
    // Error handled by composable
  }
}

const deleteApp = async (id: number) => {
  if (confirm('Are you sure you want to delete this application?')) {
    try {
      await deleteApplication(id)
      if (user.value) {
        await loadApplications(user.value.id)
      }
    } catch (err) {
      // Error handled by composable
    }
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatStatus = (status: string) => {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const onJobAdded = () => {
  showAddForm.value = false
  if (user.value) {
    loadApplications(user.value.id)
  }
}

const exportToExcel = () => {
  const data = applications.value.map(app => ({
    'Company': app.company?.name || '',
    'Position': app.position || '',
    'Industry': app.company?.industry || '',
    'Status': app.status,
    'Applied Date': app.applied_date ? formatDate(app.applied_date) : '',
    'Created Date': formatDate(app.created_at),
    'Job Link': app.job_link || '',
    'Referrer Name': app.referrer_name || '',
    'Referrer LinkedIn': app.referrer_linkedin || '',
    'Notes': app.notes || ''
  }))
  
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Job Applications')
  XLSX.writeFile(wb, `job-applications-${new Date().toISOString().split('T')[0]}.xlsx`)
}

onMounted(() => {
  if (user.value) {
    loadApplications(user.value.id)
  }
})
</script>

<style scoped>
.job-tracking-page {
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

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  font-size: 14px;
  color: var(--text-primary);
  min-width: 200px;
}

.filter-select {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  font-size: 14px;
  color: var(--text-primary);
  min-width: 160px;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: var(--shadow-focus);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: var(--shadow-focus);
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

.export-btn {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 12px 24px;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: var(--shadow);
}

.export-btn:hover {
  background: var(--bg-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-hover);
}

.add-job-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.add-job-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(22, 163, 74, 0.3);
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

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--border-light);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state h3 {
  margin: 0 0 12px 0;
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.empty-state p {
  margin: 0 0 24px 0;
  font-size: 14px;
}

.cta-btn {
  background: var(--primary);
  color: white;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(22, 163, 74, 0.2);
}

.cta-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(22, 163, 74, 0.3);
}

.applications-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.applications-section h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px 0;
}

.archived-section h2 {
  color: var(--text-secondary);
}

.applications-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.application-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-large);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  box-shadow: var(--shadow);
  transition: all 0.2s ease;
}

.archived-card {
  opacity: 0.8;
  background: var(--bg-secondary);
}

.application-card:hover {
  border-color: var(--primary-light);
  box-shadow: var(--shadow-hover);
  transform: translateY(-1px);
}

.application-info {
  flex: 1;
  min-width: 0;
}

.application-info h3 {
  margin: 0 0 10px 0;
  font-size: 19px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.position {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 500;
}

.meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-seeking-referral {
  background: #fef3c7;
  color: #92400e;
}

.status-referred-not-applied {
  background: #dbeafe;
  color: #1e40af;
}

.status-referred-and-applied {
  background: #d1fae5;
  color: #065f46;
}

.status-applied {
  background: #e0e7ff;
  color: #3730a3;
}

.status-interviewing {
  background: #fce7f3;
  color: #be185d;
}

.status-offer {
  background: #d1fae5;
  color: #065f46;
}

.status-rejected {
  background: #fee2e2;
  color: #991b1b;
}

.status-withdrawn {
  background: #f3f4f6;
  color: #374151;
}

.industry, .date {
  font-size: 14px;
  color: var(--text-secondary);
}

.job-link {
  display: inline-block;
  margin: 8px 0;
  font-size: 14px;
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.job-link:hover {
  text-decoration: underline;
}

.referrer-info {
  margin: 8px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.referrer-label {
  color: var(--text-secondary);
}

.referrer-name {
  color: var(--text-primary);
  font-weight: 500;
}

.referrer-linkedin {
  color: var(--primary);
  text-decoration: none;
  font-size: 13px;
}

.referrer-linkedin:hover {
  text-decoration: underline;
}

.notes {
  margin: 8px 0 0 0;
  font-size: 14px;
  color: var(--text-secondary);
  font-style: italic;
}

.application-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;
}

.status-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  font-size: 14px;
  color: var(--text-primary);
}

.status-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: var(--shadow-focus);
}

.delete-btn {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 8px;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn svg {
  width: 16px;
  height: 16px;
}

.delete-btn:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fecaca;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-input {
    min-width: auto;
  }
  
  .application-card {
    flex-direction: column;
    gap: 16px;
  }
  
  .application-actions {
    align-self: stretch;
    justify-content: space-between;
  }
}
</style>