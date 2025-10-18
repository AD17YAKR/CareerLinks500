<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <router-link to="/search" class="logo">
          <h1>CareerLinks500</h1>
        </router-link>
        <nav class="nav">
          <router-link to="/search" class="nav-link">Companies</router-link>
          <router-link to="/add" class="nav-link">Add Company</router-link>
        </nav>
      </div>
    </header>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
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
  
  .main {
    padding: 20px 0;
  }
}


</style>