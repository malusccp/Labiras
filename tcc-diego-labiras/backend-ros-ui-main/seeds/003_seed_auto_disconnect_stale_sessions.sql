-- Create function to automatically disconnect stale sessions
-- This function finds sessions that:
-- 1. Have a 'connected' log older than 1 day
-- 2. Don't have a corresponding 'disconnected' log
-- And creates the missing 'disconnected' log

CREATE OR REPLACE FUNCTION auto_disconnect_stale_sessions()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  closed_count INTEGER := 0;
  session_record RECORD;
BEGIN
  -- Find sessions with only 'connected' logs older than 1 day
  -- that don't have a corresponding 'disconnected' log
  FOR session_record IN
    WITH latest_connection AS (
      SELECT 
        user_id,
        session_id,
        MAX(ts) as last_connection_time
      FROM logs
      WHERE event = 'connected'
      GROUP BY user_id, session_id
    )
    SELECT 
      lc.user_id,
      lc.session_id,
      lc.last_connection_time
    FROM latest_connection lc
    WHERE lc.last_connection_time < NOW() - INTERVAL '1 day'
      AND NOT EXISTS (
        -- Check if this session already has a 'disconnected' log
        SELECT 1
        FROM logs l2
        WHERE l2.user_id = lc.user_id
          AND l2.session_id = lc.session_id
          AND l2.event = 'disconnected'
      )
  LOOP
    -- Insert the missing 'disconnected' log
    INSERT INTO logs (user_id, session_id, event, ts)
    VALUES (
      session_record.user_id,
      session_record.session_id,
      'disconnected',
      session_record.last_connection_time + INTERVAL '1 day'
    );
    
    closed_count := closed_count + 1;
  END LOOP;
  
  RETURN closed_count;
END;
$$;

-- Create a trigger function that runs after INSERT on logs table
-- This will automatically check and close stale sessions when new logs are inserted
CREATE OR REPLACE FUNCTION check_and_close_stale_sessions()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Call the auto_disconnect_stale_sessions function
  -- This will check for any stale sessions and close them
  PERFORM auto_disconnect_stale_sessions();
  
  RETURN NEW;
END;
$$;

-- Create the trigger that fires after INSERT on logs table
DROP TRIGGER IF EXISTS trigger_auto_disconnect_stale_sessions ON logs;
CREATE TRIGGER trigger_auto_disconnect_stale_sessions
  AFTER INSERT ON logs
  FOR EACH ROW
  EXECUTE FUNCTION check_and_close_stale_sessions();

-- Optional: Create a comment explaining the function
COMMENT ON FUNCTION auto_disconnect_stale_sessions() IS 
  'Automatically creates disconnected logs for sessions that have been connected for more than 1 day without a disconnection log. Returns the number of sessions closed.';

