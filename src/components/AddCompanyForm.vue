<template>
  <div class="add-form-container">
    <div class="form-header">
      <h3>Add New Company</h3>
      <p>Help expand our Fortune 500 career directory</p>
    </div>
    
    <form @submit.prevent="onSubmit" class="add-form">
      <div class="form-group">
        <label for="company-name">Company Name *</label>
        <input
          id="company-name"
          v-model="name"
          type="text"
          placeholder="e.g., Apple Inc."
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
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="industry">Industry</label>
        <input
          id="industry"
          v-model="industry"
          type="text"
          placeholder="e.g., Technology, Healthcare"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="headquarters">Headquarters</label>
        <input
          id="headquarters"
          v-model="headquarters"
          type="text"
          placeholder="e.g., Cupertino, CA"
          class="form-input"
        />
      </div>
      
      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? 'Adding Company...' : 'Add Company' }}
      </button>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const careerUrl = ref('')
const industry = ref('')
const headquarters = ref('')

const emit = defineEmits<{
  add: [data: { name: string; career_url: string; industry?: string; headquarters?: string }]
}>()

defineProps<{
  loading: boolean
  error: string | null
}>()

const onSubmit = () => {
  if (name.value && careerUrl.value) {
    emit('add', {
      name: name.value,
      career_url: careerUrl.value,
      industry: industry.value || undefined,
      headquarters: headquarters.value || undefined
    })
    name.value = ''
    careerUrl.value = ''
    industry.value = ''
    headquarters.value = ''
  }
}
</script>

<style scoped>
.add-form-container {
  max-width: 500px;
  margin: 0 auto;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h3 {
  color: var(--gray-900);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.form-header p {
  color: var(--gray-500);
  margin: 0;
}

.add-form {
  background: var(--gray-50);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--gray-200);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--gray-700);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 6px;
  font-size: 1rem;
  background: var(--white);
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.submit-btn {
  width: 100%;
  background: var(--success);
  color: var(--white);
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #15803d;
}

.submit-btn:disabled {
  background: var(--gray-500);
  cursor: not-allowed;
}

.error-message {
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 1rem;
  font-size: 0.875rem;
}
</style>