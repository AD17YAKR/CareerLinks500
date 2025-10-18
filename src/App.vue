<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <router-link to="/" class="logo">
          <h1>CareerLinks500</h1>
        </router-link>
        <nav class="nav">
          <router-link to="/" class="nav-link">Companies</router-link>
          <router-link v-if="isAuthenticated" to="/jobs" class="nav-link">My Jobs</router-link>
          <router-link v-if="isAuthenticated" to="/add" class="nav-link">Add Company</router-link>
          <div v-if="isAuthenticated" class="user-menu">
            <span class="user-email">{{ user?.email }}</span>
            <button @click="handleSignOut" class="sign-out-btn">Sign Out</button>
          </div>
          <router-link v-else to="/auth" class="nav-link auth-link">Sign In</router-link>
        </nav>
      </div>
    </header>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const { user, isAuthenticated, signOut, initAuth } = useAuth()

const handleSignOut = async () => {
  await signOut()
  router.push('/')
}

onMounted(() => {
  initAuth()
})
</script>

<style>
/* CSS variables are now managed by theme.ts */

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.5;
  min-height: 100vh;
  font-size: 14px;
}

#app {
  min-height: 100vh;
}

*:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

button:focus,
input:focus {
  outline: none;
}

.header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo {
  text-decoration: none;
}

.logo h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.nav {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 0;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link.router-link-active {
  color: var(--primary);
  border-bottom: 2px solid var(--primary);
}

.auth-link {
  background: var(--primary);
  color: white !important;
  padding: 8px 16px !important;
  border-radius: var(--radius);
  transition: all 0.2s;
}

.auth-link:hover {
  background: var(--primary-hover);
  color: white !important;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-email {
  font-size: 14px;
  color: var(--text-secondary);
}

.sign-out-btn {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.sign-out-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.main {
  padding: 40px 0;
}

@media (max-width: 768px) {
  .header .container {
    height: auto;
    flex-direction: column;
    gap: 16px;
    padding: 16px 20px;
  }
  
  .nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
  
  .user-menu {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  
  .main {
    padding: 20px 0;
  }
}


</style>