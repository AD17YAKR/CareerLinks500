import { ref } from 'vue'
import { addJobApplication, updateJobApplication, getUserJobApplications, deleteJobApplication } from '../services/jobTracking'
import type { JobApplication, JobStatus } from '../types/jobTracking'

export function useJobTracking() {
  const applications = ref<JobApplication[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadApplications = async (userId: string) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await getUserJobApplications(userId)
      if (fetchError) throw fetchError
      applications.value = data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load applications'
    } finally {
      loading.value = false
    }
  }

  const addApplication = async (data: {
    company_id: number
    status: JobStatus
    position?: string
    notes?: string
    job_link?: string
    referrer_name?: string
    referrer_linkedin?: string
    applied_date?: string
  }) => {
    loading.value = true
    error.value = null
    try {
      const { error: addError } = await addJobApplication(data)
      if (addError) throw addError
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add application'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateApplication = async (id: number, data: {
    status?: JobStatus
    position?: string
    notes?: string
    job_link?: string
    referrer_name?: string
    referrer_linkedin?: string
    applied_date?: string
  }) => {
    loading.value = true
    error.value = null
    try {
      const { error: updateError } = await updateJobApplication(id, data)
      if (updateError) throw updateError
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update application'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteApplication = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const { error: deleteError } = await deleteJobApplication(id)
      if (deleteError) throw deleteError
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete application'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    applications,
    loading,
    error,
    loadApplications,
    addApplication,
    updateApplication,
    deleteApplication
  }
}