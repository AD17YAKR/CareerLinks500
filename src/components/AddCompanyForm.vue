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
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-lg);
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
  padding: 0.875rem;
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  font-size: 1rem;
  background: var(--glass-bg);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  background: var(--white);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15), 0 4px 12px rgba(37, 99, 235, 0.1);
  transform: translateY(-1px);
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, var(--success), #22c55e);
  color: var(--white);
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #15803d, #16a34a);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
}

.submit-btn:disabled {
  background: var(--gray-500);
  cursor: not-allowed;
}

.error-message {
  color: #dc2626;
  background: rgba(254, 242, 242, 0.9);
  backdrop-filter: blur(5px);
  border: 1px solid #fecaca;
  border-radius: 10px;
  padding: 0.875rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  box-shadow: var(--shadow);
}
</style>