export interface JobApplication {
  id: number
  user_id: string
  company_id: string
  status: 'seeking_referral' | 'referred_not_applied' | 'referred_and_applied' | 'applied' | 'interviewing' | 'offer' | 'rejected' | 'withdrawn'
  position?: string
  notes?: string
  job_link?: string
  referrer_name?: string
  referrer_linkedin?: string
  applied_date?: string
  created_at: string
  updated_at: string
  company?: {
    name: string
    career_url: string
    industry?: string
    headquarters?: string
  }
}

export type JobStatus = JobApplication['status']