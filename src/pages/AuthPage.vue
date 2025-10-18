<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-container">
        <div class="auth-header">
          <h1>{{ isSignUp ? 'Create Account' : 'Sign In' }}</h1>
          <p>{{ isSignUp ? 'Join CareerLinks500 to track your job applications' : 'Welcome back to CareerLinks500' }}</p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="your@email.com"
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="form-input"
            />
          </div>
          
          <button type="submit" :disabled="loading" class="submit-btn">
            {{ loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In') }}
          </button>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>
        
        <div class="auth-switch">
          <p>
            {{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}
            <button @click="toggleMode" class="link-btn">
              {{ isSignUp ? 'Sign In' : 'Sign Up' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { signIn, signUp, loading, error } = useAuth()

const isSignUp = ref(false)
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  try {
    if (isSignUp.value) {
      await signUp(email.value, password.value)
    } else {
      await signIn(email.value, password.value)
    }
    if (!error.value) {
      router.push('/')
    }
  } catch (err) {
    // Error handled by composable
  }
}

const toggleMode = () => {
  isSignUp.value = !isSignUp.value
  email.value = ''
  password.value = ''
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 0 20px;
}

.auth-container {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 40px;
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-header h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text-primary);
}

.auth-header p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.auth-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--text-primary);
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 14px;
  background: var(--bg-primary);
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
}

.submit-btn {
  width: 100%;
  background: var(--primary) !important;
  color: white !important;
  border: none;
  padding: 12px;
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
  background: var(--text-muted) !important;
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
  text-align: center;
}

.auth-switch {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.auth-switch p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.link-btn {
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
}

.link-btn:hover {
  color: var(--primary-hover);
}

@media (max-width: 768px) {
  .auth-container {
    padding: 24px;
  }
}
</style>