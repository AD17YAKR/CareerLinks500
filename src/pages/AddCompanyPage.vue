<template>
  <div class="add-page">
    <div class="section">
      <AddCompanyForm
        :loading="loading"
        :error="error"
        @add="handleAdd"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCompanies } from '../composables/useCompanies'
import AddCompanyForm from '../components/AddCompanyForm.vue'

const router = useRouter()
const { loading, error, add } = useCompanies()

const handleAdd = async (data: { name: string; career_url: string; industry?: string; headquarters?: string }) => {
  await add(data)
  if (!error.value) {
    router.push('/search')
  }
}
</script>

<style scoped>
.add-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section {
  background: var(--white);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow);
}

@media (max-width: 768px) {
  .section {
    padding: 1.5rem;
  }
}
</style>