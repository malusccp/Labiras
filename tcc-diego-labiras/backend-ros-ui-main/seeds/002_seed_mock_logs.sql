-- Insert mock log sessions for the admin user
WITH admin_user AS (
  SELECT id FROM users WHERE username = 'user.admin' LIMIT 1
)
INSERT INTO logs (user_id, session_id, event, ts)
SELECT 
  admin_user.id,
  'session-001',
  'connected',
  NOW() - INTERVAL '2 hours'
FROM admin_user
UNION ALL
SELECT 
  admin_user.id,
  'session-001',
  'disconnected',
  NOW() - INTERVAL '1 hour'
FROM admin_user
UNION ALL
SELECT 
  admin_user.id,
  'session-002',
  'connected',
  NOW() - INTERVAL '30 minutes'
FROM admin_user
UNION ALL
SELECT 
  admin_user.id,
  'session-002',
  'disconnected',
  NOW() - INTERVAL '15 minutes'
FROM admin_user
UNION ALL
SELECT 
  admin_user.id,
  'session-003',
  'connected',
  NOW() - INTERVAL '5 minutes'
FROM admin_user;