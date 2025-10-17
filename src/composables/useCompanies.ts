import { ref } from 'vue'
import type { Company } from '../types/company'
import { addCompany, searchCompanies, updateCompany } from '../services/companies'

export function useCompanies() {
  const companies = ref<Company[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const search = async (query: string) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: searchError } = await searchCompanies(query)
      if (searchError) throw searchError
      companies.value = data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Search failed'
    } finally {
      loading.value = false
    }
  }

  const add = async (companyData: { 
    name: string
    career_url: string
    industry?: string
    headquarters?: string
  }) => {
    loading.value = true
    error.value = null
    try {
      const { error: addError } = await addCompany(companyData)
      if (addError) throw addError
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Add failed'
    } finally {
      loading.value = false
    }
  }

  const update = async (id: number, companyData: { 
    name: string
    career_url: string
    industry?: string
    headquarters?: string
  }) => {
    loading.value = true
    error.value = null
    try {
      const { error: updateError } = await updateCompany(id, companyData)
      if (updateError) throw updateError
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Update failed'
    } finally {
      loading.value = false
    }
  }

  return {
    companies,
    loading,
    error,
    search,
    add,
    update
  }
}