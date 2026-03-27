/* eslint-disable camelcase */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // Ensure default admin user exists (matching SQLite seeds)
  pgm.sql(`
    INSERT INTO users (name, username, password)
    VALUES ('Admin User', 'user.admin', 'admin123')
    ON CONFLICT (username) DO NOTHING;
  `);

  // Optional mock logs for the admin user
  pgm.sql(`
    WITH admin AS (
      SELECT id AS user_id FROM users WHERE username = 'user.admin' LIMIT 1
    )
    INSERT INTO logs (user_id, session_id, event, ts)
    SELECT user_id, 'session-001', 'connected', NOW() - INTERVAL '2 hours' FROM admin;
  `);

  pgm.sql(`
    WITH admin AS (
      SELECT id AS user_id FROM users WHERE username = 'user.admin' LIMIT 1
    )
    INSERT INTO logs (user_id, session_id, event, ts)
    SELECT user_id, 'session-001', 'disconnected', NOW() - INTERVAL '1 hour' FROM admin;
  `);

  pgm.sql(`
    WITH admin AS (
      SELECT id AS user_id FROM users WHERE username = 'user.admin' LIMIT 1
    )
    INSERT INTO logs (user_id, session_id, event, ts)
    SELECT user_id, 'session-002', 'connected', NOW() - INTERVAL '30 minutes' FROM admin;
  `);

  pgm.sql(`
    WITH admin AS (
      SELECT id AS user_id FROM users WHERE username = 'user.admin' LIMIT 1
    )
    INSERT INTO logs (user_id, session_id, event, ts)
    SELECT user_id, 'session-002', 'disconnected', NOW() - INTERVAL '15 minutes' FROM admin;
  `);

  pgm.sql(`
    WITH admin AS (
      SELECT id AS user_id FROM users WHERE username = 'user.admin' LIMIT 1
    )
    INSERT INTO logs (user_id, session_id, event, ts)
    SELECT user_id, 'session-003', 'connected', NOW() - INTERVAL '5 minutes' FROM admin;
  `);
};

exports.down = (pgm) => {
  // Remove mock logs and admin user
  pgm.sql(`DELETE FROM logs WHERE session_id IN ('session-001','session-002','session-003');`);
  pgm.sql(`DELETE FROM users WHERE username = 'user.admin';`);
};
