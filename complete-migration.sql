-- Add job_link column to job_applications table
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS job_link TEXT;

-- Update the status check constraint to include new statuses
ALTER TABLE job_applications 
DROP CONSTRAINT IF EXISTS job_applications_status_check;

ALTER TABLE job_applications 
ADD CONSTRAINT job_applications_status_check 
CHECK (status IN ('seeking_referral', 'referred_not_applied', 'referred_and_applied', 'applied', 'interviewing', 'offer', 'rejected', 'withdrawn'));