-- SCAIPS Database Management Queries for pgAdmin

-- 1. VIEW ALL USERS WITH DETAILS
SELECT 
    id,
    email,
    "fullName",
    role,
    "isActive",
    "loginCount",
    "createdAt",
    "lastLoginAt"
FROM users 
ORDER BY "createdAt" DESC;

-- 2. COUNT USERS BY ROLE
SELECT 
    role,
    COUNT(*) as total_users,
    COUNT(CASE WHEN "isActive" = true THEN 1 END) as active_users
FROM users 
GROUP BY role 
ORDER BY total_users DESC;

-- 3. FIND USERS BY ROLE
SELECT "fullName", email, bio, "createdAt"
FROM users 
WHERE role = 'student'  -- Change to: alumni, college, industry, startup
ORDER BY "createdAt" DESC;

-- 4. SEARCH USERS BY NAME OR EMAIL
SELECT "fullName", email, role, "isActive"
FROM users 
WHERE "fullName" ILIKE '%search_term%' 
   OR email ILIKE '%search_term%'
ORDER BY "fullName";

-- 5. UPDATE USER PROFILE
UPDATE users 
SET 
    bio = 'Updated bio text',
    "profileVisibility" = 'public',
    "updatedAt" = NOW()
WHERE email = 'user@example.com';

-- 6. ACTIVATE/DEACTIVATE USER
UPDATE users 
SET "isActive" = false, "updatedAt" = NOW()
WHERE email = 'user@example.com';

-- 7. VIEW USER LOGIN STATISTICS
SELECT 
    "fullName",
    email,
    role,
    "loginCount",
    "lastLoginAt",
    "createdAt"
FROM users 
WHERE "loginCount" > 0
ORDER BY "loginCount" DESC;

-- 8. DELETE INACTIVE USERS (BE CAREFUL!)
-- First, view users to be deleted:
SELECT "fullName", email, "createdAt"
FROM users 
WHERE "isActive" = false 
  AND "loginCount" = 0 
  AND "createdAt" < NOW() - INTERVAL '30 days';

-- Then delete (uncomment when ready):
-- DELETE FROM users 
-- WHERE "isActive" = false 
--   AND "loginCount" = 0 
--   AND "createdAt" < NOW() - INTERVAL '30 days';

-- 9. BACKUP USERS DATA (for export)
SELECT 
    email,
    "fullName",
    role,
    bio,
    "collegeName",
    "companyName",
    skills,
    "isActive",
    "createdAt"
FROM users 
ORDER BY "createdAt" DESC;

-- 10. RESET USER PASSWORD (hash for 'NewPassword123!')
UPDATE users 
SET 
    password = '$2a$12$FiLDJxm4Q50milhHSR/IsuxUlbfwNTvpwnePq5M.QHaR.o44h3UX.',
    "updatedAt" = NOW()
WHERE email = 'user@example.com';

-- 11. VIEW TABLE STRUCTURE
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 12. DATABASE STATISTICS
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    most_common_vals
FROM pg_stats 
WHERE tablename = 'users';
