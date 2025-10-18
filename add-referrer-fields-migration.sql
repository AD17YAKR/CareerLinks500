-- Add referrer fields to job_applications table
ALTER TABLE job_applications 
ADD COLUMN referrer_name TEXT,
ADD COLUMN referrer_linkedin TEXT;

-- Update the status check constraint to include new statuses
ALTER TABLE job_applications 
DROP CONSTRAINT job_applications_status_check;

ALTER TABLE job_applications 
ADD CONSTRAINT job_applications_status_check 
CHECK (status IN ('seeking_referral', 'referred_not_applied', 'referred_and_applied', 'applied', 'interviewing', 'offer', 'rejected', 'withdrawn'));

-- Add comments for documentation
COMMENT ON COLUMN job_applications.referrer_name IS 'Name of the person who referred this job';
COMMENT ON COLUMN job_applications.referrer_linkedin IS 'LinkedIn profile URL of the referrer';