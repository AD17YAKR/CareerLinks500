-- Add job_link column to job_applications table
ALTER TABLE job_applications 
ADD COLUMN job_link TEXT;

-- Add comment for documentation
COMMENT ON COLUMN job_applications.job_link IS 'URL link to the job posting';