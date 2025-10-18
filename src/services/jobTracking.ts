import { supabase } from './supabaseClient'
import type { JobApplication, JobStatus } from '../types/jobTracking'

export async function addJobApplication(data: {
  company_id: number
  status: JobStatus
  position?: string
  notes?: string
  job_link?: string
  referrer_name?: string
  referrer_linkedin?: string
  applied_date?: string
}) {
  return supabase.from('job_applications').insert(data)
}

export async function updateJobApplication(id: number, data: {
  status?: JobStatus
  position?: string
  notes?: string
  job_link?: string
  referrer_name?: string
  referrer_linkedin?: string
  applied_date?: string
}) {
  return supabase.from('job_applications').update(data).eq('id', id)
}

export async function getUserJobApplications(userId: string) {
  return supabase
    .from('job_applications')
    .select(`
      *,
      company:companies(name, career_url, industry, headquarters)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

export async function deleteJobApplication(id: number) {
  return supabase.from('job_applications').delete().eq('id', id)
}