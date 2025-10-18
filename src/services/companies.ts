import { supabase } from './supabaseClient'
import type { Company } from '../types/company'

export async function addCompany(c: { 
  name: string
  career_url: string
  industry?: string
  headquarters?: string
}) {
  return supabase.from('companies').insert(c)
}

export async function searchCompanies(q: string, sortBy = 'name', sortOrder = 'asc', page = 1, limit = 20) {
  const from = (page - 1) * limit
  const to = from + limit - 1
  
  let query = supabase.from('companies').select('*', { count: 'exact' })
  
  if (q.trim()) {
    query = query.or(`name.ilike.%${q}%,industry.ilike.%${q}%,headquarters.ilike.%${q}%`)
  }
  
  return query.order(sortBy, { ascending: sortOrder === 'asc' }).range(from, to)
}

export async function getAllCompanies() {
  return supabase
    .from('companies')
    .select('*')
    .order('name')
}

export async function updateCompany(id: number, data: { 
  name: string
  career_url: string
  industry?: string
  headquarters?: string
}) {
  return supabase.from('companies').update(data).eq('id', id)
}