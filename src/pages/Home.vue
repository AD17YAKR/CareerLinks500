<template>
  <div class="home">
    <header class="header">
      <div class="container">
        <div class="logo">
          <h1>CareerLinks500</h1>
          <p>Fortune 500 Career Directory</p>
        </div>
        <nav class="nav">
          <button 
            @click="activeSection = 'search'" 
            :class="['nav-btn', { active: activeSection === 'search' }]"
          >
            Search Companies
          </button>
          <button 
            @click="activeSection = 'add'" 
            :class="['nav-btn', { active: activeSection === 'add' }]"
          >
            Add Company
          </button>
        </nav>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <section v-show="activeSection === 'search'" class="section">
          <SearchBar @search="handleSearch" />
          <CompanyList :companies="companies" :loading="loading" />
        </section>

        <section v-show="activeSection === 'add'" class="section">
          <AddCompanyForm
            :loading="loading"
            :error="error"
            @add="handleAdd"
          />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCompanies } from '../composables/useCompanies'

import AddCompanyForm from '../components/AddCompanyForm.vue'
import SearchBar from '../components/SearchBar.vue'
import CompanyList from '../components/CompanyList.vue'

const { companies, loading, error, search, add } = useCompanies()

const activeSection = ref('search')

const handleSearch = (query: string) => {
  search(query)
}

const handleAdd = async (data: { name: string; career_url: string; industry?: string; headquarters?: string }) => {
  await add(data)
  if (!error.value) {
    activeSection.value = 'search'
    search('')
  }
}

onMounted(() => {
  search('')
})
</script>

<style scoped>
.home {
  min-height: 100vh;
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

.nav-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  background: var(--white);
  color: var(--gray-700);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: var(--gray-50);
}

.nav-btn.active {
  background: var(--primary);
  color: var(--white);
  border-color: var(--primary);
}

.main {
  padding: 2rem 0;
}

.section {
  background: var(--white);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow);
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
  
  .section {
    padding: 1.5rem;
  }
}
</style>