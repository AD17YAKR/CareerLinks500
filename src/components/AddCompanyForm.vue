<template>
  <div class="add-form-container">
    <div class="form-header">
      <h1>Add Company</h1>
      <p>Help expand our Fortune 500 career directory</p>
    </div>
    
    <form @submit.prevent="onSubmit" class="add-form">
      <div class="form-row">
        <div class="form-group">
          <label for="company-name">Company Name *</label>
          <input
            id="company-name"
            v-model="name"
            type="text"
            placeholder="Apple Inc."
            required
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="career-url">Career Page URL *</label>
          <input
            id="career-url"
            v-model="careerUrl"
            type="url"
            placeholder="https://careers.company.com"
            required
            :class="['form-input', { 'invalid': careerUrl && !isValidUrl }]"
          />
          <div v-if="careerUrl && !isValidUrl" class="field-error">
            Please enter a valid URL
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="industry">Industry</label>
          <input
            id="industry"
            v-model="industry"
            type="text"
            placeholder="Technology"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="headquarters">Headquarters</label>
          <input
            id="headquarters"
            v-model="headquarters"
            type="text"
            placeholder="Cupertino, CA"
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-actions">
        <button type="submit" :disabled="loading || !canSubmit" class="submit-btn">
          {{ loading ? 'Adding...' : 'Add Company' }}
        </button>
      </div>
      
      <div v-if="validationError" class="error-message">
        {{ validationError }}
      </div>
      
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const name = ref('')
const careerUrl = ref('')
const industry = ref('')
const headquarters = ref('')
const validationError = ref('')

const emit = defineEmits<{
  add: [data: { name: string; career_url: string; industry?: string; headquarters?: string }]
}>()

defineProps<{
  loading: boolean
  error: string | null
}>()

const isValidUrl = computed(() => {
  if (!careerUrl.value) return true
  try {
    new URL(careerUrl.value)
    return true
  } catch {
    return false
  }
})

const canSubmit = computed(() => {
  return name.value.trim() && careerUrl.value.trim() && isValidUrl.value
})

const onSubmit = () => {
  validationError.value = ''
  
  if (!name.value.trim()) {
    validationError.value = 'Company name is required'
    return
  }
  
  if (!careerUrl.value.trim()) {
    validationError.value = 'Career URL is required'
    return
  }
  
  if (!isValidUrl.value) {
    validationError.value = 'Please enter a valid URL (e.g., https://careers.company.com)'
    return
  }
  
  emit('add', {
    name: name.value.trim(),
    career_url: careerUrl.value.trim(),
    industry: industry.value.trim() || undefined,
    headquarters: headquarters.value.trim() || undefined
  })
  
  // Clear form on successful submission
  name.value = ''
  careerUrl.value = ''
  industry.value = ''
  headquarters.value = ''
}
</script>

<style scoped>
.add-form-container {
  max-width: 600px;
  margin: 0 auto;
}

.form-header {
  margin-bottom: 32px;
}

.form-header h1 {
  color: var(--text-primary);
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
}

.form-header p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 16px;
}

.add-form {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--text-primary);
  font-size: 14px;
}

.form-input {
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 14px;
  background: var(--bg-primary);
  transition: all 0.2s;
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
}

.form-input.invalid {
  border-color: #dc2626;
}

.form-input.invalid:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.field-error {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
}

.form-actions {
  margin-top: 24px;
}

.submit-btn {
  background: var(--primary) !important;
  color: white !important;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: var(--primary-hover) !important;
}

.submit-btn:disabled {
  background: var(--text-muted);
  cursor: not-allowed;
}

.error-message {
  color: #c53030;
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: var(--radius);
  padding: 12px;
  margin-top: 16px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .add-form {
    padding: 24px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .form-header h1 {
    font-size: 24px;
  }
}
</style>