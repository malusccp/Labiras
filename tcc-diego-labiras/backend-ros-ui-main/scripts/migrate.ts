import fs from 'fs';
import path from 'path';
// Use the existing JS helper for the DB connection
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../src/database/sqlite');

const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');
const files = fs
  .readdirSync(MIGRATIONS_DIR)
  .filter((f) => f.endsWith('.sql'))
  .sort();

console.log('Running migrations...');

for (const file of files) {
  const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
  console.log(`>> Running migration: ${file}`);
  db.exec(sql);
}

console.log('Migrations completed successfully!');

