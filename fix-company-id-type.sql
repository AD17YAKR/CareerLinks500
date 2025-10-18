-- Fix company_id type mismatch in job_applications table
ALTER TABLE job_applications 
DROP CONSTRAINT IF EXISTS job_applications_company_id_fkey;

ALTER TABLE job_applications 
ALTER COLUMN company_id TYPE UUID USING company_id::text::uuid;

ALTER TABLE job_applications 
ADD CONSTRAINT job_applications_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE;