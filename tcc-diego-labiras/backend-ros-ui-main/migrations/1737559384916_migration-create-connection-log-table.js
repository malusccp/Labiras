/* eslint-disable camelcase */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // Users table (PostgreSQL)
  pgm.createTable("users", {
    id: { type: "serial", primaryKey: true },
    name: { type: "varchar(255)", notNull: true },
    username: { type: "varchar(255)", notNull: true, unique: true },
    password: { type: "varchar(255)", notNull: true },
    created_at: { type: "timestamp", notNull: true, default: pgm.func("CURRENT_TIMESTAMP") },
  });
  pgm.createIndex("users", "username", { name: "idx_users_username" });

  // Logs table (PostgreSQL) - similar to SQLite schema
  pgm.createTable("logs", {
    id: { type: "serial", primaryKey: true },
    user_id: { type: "integer", notNull: true, references: "users", onDelete: "CASCADE" },
    session_id: { type: "varchar(255)", notNull: true },
    event: { type: "varchar(32)", notNull: true },
    ts: { type: "timestamp", notNull: true, default: pgm.func("CURRENT_TIMESTAMP") },
  });

  // Add CHECK constraint for event values ('connected','disconnected')
  pgm.addConstraint("logs", "logs_event_check", {
    check: "event IN ('connected','disconnected')",
  });

  // Helpful indexes
  pgm.createIndex("logs", "user_id", { name: "idx_logs_user_id" });
  pgm.createIndex("logs", "session_id", { name: "idx_logs_session_id" });
  pgm.createIndex("logs", "event", { name: "idx_logs_event" });
};

exports.down = (pgm) => {
  // Drop in proper order
  pgm.dropTable("logs");
  pgm.dropTable("users");
};
