import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Company } from '../types/company'
import { addCompany, searchCompanies, updateCompany } from '../services/companies'

export function useCompanies() {
  const companies = ref<Company[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const router = useRouter()
  const totalCount = ref(0)
  const currentPage = ref(1)
  const sortBy = ref('name')
  const sortOrder = ref<'asc' | 'desc'>('asc')
  const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes
  
  const getCache = (key: string) => {
    try {
      const cached = localStorage.getItem(`companies_${key}`)
      return cached ? JSON.parse(cached) : null
    } catch { return null }
  }
  
  const setCache = (key: string, data: any) => {
    try {
      localStorage.setItem(`companies_${key}`, JSON.stringify(data))
    } catch {}
  }
  
  const clearCache = () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('companies_')) localStorage.removeItem(key)
    })
  }

  const search = async (query: string, page = 1) => {
    const cacheKey = `${query}-${sortBy.value}-${sortOrder.value}-${page}`
    const cached = getCache(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      companies.value = cached.data
      totalCount.value = cached.count
      currentPage.value = page
      return
    }
    
    loading.value = true
    error.value = null
    try {
      const { data, count, error: searchError } = await searchCompanies(query, sortBy.value, sortOrder.value, page)
      if (searchError) throw searchError
      companies.value = data || []
      totalCount.value = count || 0
      currentPage.value = page
      
      setCache(cacheKey, { data: data || [], count: count || 0, timestamp: Date.now() })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load companies. Please try again.'
      companies.value = []
      totalCount.value = 0
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
      clearCache() // Clear cache when adding company
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add company. Please check your input and try again.'
      throw err
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
      clearCache() // Clear cache when updating company
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update company. Please try again.'
      throw err
    } finally {
      loading.value = false
    }
  }

  const setSorting = (field: string, order: 'asc' | 'desc') => {
    sortBy.value = field
    sortOrder.value = order
  }

  return {
    companies,
    loading,
    error,
    totalCount,
    currentPage,
    sortBy,
    sortOrder,
    search,
    add,
    update,
    setSorting
  }
}