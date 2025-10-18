<template>
  <div class="add-job-form">
    <h3>Add New Job Application</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="jobLink">Job Link *</label>
        <input
          id="jobLink"
          v-model="form.jobLink"
          type="url"
          placeholder="https://company.com/careers/job-id"
          required
        />
      </div>

      <div class="form-group">
        <label for="company">Company *</label>
        <select
          id="company"
          v-model="form.companyId"
          required
        >
          <option value="">Select a company</option>
          <option
            v-for="company in companies"
            :key="company.id"
            :value="company.id"
          >
            {{ company.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="status">Status *</label>
        <select
          id="status"
          v-model="form.status"
          required
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
      </div>

      <div v-if="showReferrerFields" class="referrer-section">
        <div class="form-group">
          <label for="referrerName">Referrer Name</label>
          <input
            id="referrerName"
            v-model="form.referrerName"
            type="text"
            placeholder="John Doe"
          />
        </div>

        <div class="form-group">
          <label for="referrerLinkedin">Referrer LinkedIn</label>
          <input
            id="referrerLinkedin"
            v-model="form.referrerLinkedin"
            type="url"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="position">Position</label>
        <input
          id="position"
          v-model="form.position"
          type="text"
          placeholder="Software Engineer"
        />
      </div>

      <div class="form-group">
        <label for="notes">Notes</label>
        <textarea
          id="notes"
          v-model="form.notes"
          placeholder="Additional notes about this application..."
          rows="3"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="button" @click="$emit('cancel')" class="cancel-btn">
          Cancel
        </button>
        <button type="submit" :disabled="loading" class="submit-btn">
          {{ loading ? 'Adding...' : 'Add Job' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCompanies } from '../composables/useCompanies'
import { useJobTracking } from '../composables/useJobTracking'
import { useAuth } from '../composables/useAuth'
import type { JobStatus } from '../types/jobTracking'

const emit = defineEmits<{
  cancel: []
  success: []
}>()

const { companies, search } = useCompanies()
const { addApplication, loading } = useJobTracking()
const { user } = useAuth()

const form = ref({
  jobLink: '',
  companyId: '',
  status: 'seeking_referral' as JobStatus,
  position: '',
  notes: '',
  referrerName: '',
  referrerLinkedin: ''
})

const showReferrerFields = computed(() => 
  form.value.status === 'referred_not_applied' || form.value.status === 'referred_and_applied'
)

const handleSubmit = async () => {
  if (!user.value) return
  
  try {
    await addApplication({
      company_id: parseInt(form.value.companyId),
      status: form.value.status,
      position: form.value.position || undefined,
      notes: form.value.notes || undefined,
      job_link: form.value.jobLink || undefined,
      referrer_name: form.value.referrerName || undefined,
      referrer_linkedin: form.value.referrerLinkedin || undefined,
      applied_date: (form.value.status === 'applied' || form.value.status === 'referred_and_applied') ? new Date().toISOString() : undefined
    })
    
    // Reset form
    form.value = {
      jobLink: '',
      companyId: '',
      status: 'seeking_referral',
      position: '',
      notes: '',
      referrerName: '',
      referrerLinkedin: ''
    }
    
    emit('success')
  } catch (err) {
    // Error handled by composable
  }
}

onMounted(() => {
  // Load companies for the dropdown
  search('', 1)
})
</script>

<style scoped>
.add-job-form {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  margin-bottom: 24px;
}

.add-job-form h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  font-size: 14px;
  color: var(--text-primary);
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.cancel-btn {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 10px 20px;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: var(--bg-tertiary);
}

.submit-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: var(--primary-hover);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.referrer-section {
  background: var(--bg-secondary);
  padding: 16px;
  border-radius: var(--radius);
  margin-bottom: 16px;
  border: 1px solid var(--border);
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }
  
  .cancel-btn,
  .submit-btn {
    width: 100%;
  }
}
</style>