<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <div class="logo">
          <h1>CareerLinks500</h1>
          <p>Fortune 500 Career Directory</p>
        </div>
        <nav class="nav">
          <router-link to="/search" class="nav-link">
            Search Companies
          </router-link>
          <router-link to="/add" class="nav-link">
            Add Company
          </router-link>
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
:root {
  --primary: #2563eb;
  --success: #16a34a;
  --white: #ffffff;
  --black: #000000;
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-500: #64748b;
  --gray-700: #334155;
  --gray-900: #0f172a;
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: var(--gray-50);
  color: var(--gray-900);
  line-height: 1.6;
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
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
  box-shadow: var(--shadow);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-900);
}

.logo p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--gray-500);
}

.nav {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  background: var(--white);
  color: var(--gray-700);
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover {
  background: var(--gray-50);
}

.nav-link.router-link-active {
  background: var(--primary);
  color: var(--white);
  border-color: var(--primary);
}

.main {
  padding: 2rem 0;
}

@media (max-width: 768px) {
  .header .container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .main {
    padding: 1rem 0;
  }
}


</style>