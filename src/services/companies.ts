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

export async function searchCompanies(q: string) {
  if (!q.trim()) {
    return supabase
      .from('companies')
      .select('*')
      .order('name')
      .limit(50)
  }
  
  return supabase
    .from('companies')
    .select('*')
    .or(`name.ilike.%${q}%,industry.ilike.%${q}%,headquarters.ilike.%${q}%`)
    .order('name')
    .limit(50)
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