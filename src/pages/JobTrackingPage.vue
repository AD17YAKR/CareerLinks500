<template>
  <div class="job-tracking-page">
    <div class="container">
      <div class="header-section">
        <div class="header-content">
          <div>
            <h1>Job Applications</h1>
            <p>Track your job application status and progress</p>
          </div>
          <button @click="showAddForm = !showAddForm" class="add-job-btn">
            {{ showAddForm ? 'Cancel' : 'Add Job' }}
          </button>
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
      
      <div v-else class="applications-list">
        <div
          v-for="application in applications"
          :key="application.id"
          class="application-card"
        >
          <div class="application-info">
            <h3>{{ application.company?.name }}</h3>
            <p v-if="application.position" class="position">{{ application.position }}</p>
            <div class="meta">
              <span class="industry">{{ application.company?.industry }}</span>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useJobTracking } from '../composables/useJobTracking'
import AddJobForm from '../components/AddJobForm.vue'
import type { JobStatus } from '../types/jobTracking'

const { user } = useAuth()
const { applications, loading, loadApplications, updateApplication, deleteApplication } = useJobTracking()
const showAddForm = ref(false)

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

const onJobAdded = () => {
  showAddForm.value = false
  if (user.value) {
    loadApplications(user.value.id)
  }
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

.empty-state h3 {
  margin: 0 0 8px 0;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 600;
}

.empty-state p {
  margin: 0 0 24px 0;
  font-size: 14px;
}

.cta-btn {
  background: var(--primary);
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.cta-btn:hover {
  background: var(--primary-hover);
}

.applications-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.application-card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.application-info {
  flex: 1;
  min-width: 0;
}

.application-info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
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
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
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
  
  .add-job-btn {
    align-self: flex-start;
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