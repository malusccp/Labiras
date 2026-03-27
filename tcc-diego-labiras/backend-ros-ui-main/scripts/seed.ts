import fs from 'fs';
import path from 'path';
import { pool } from '../src/database/db';

const SEEDS_DIR = path.join(__dirname, '..', 'seeds');

const target = process.argv[2]; // 'users' | 'logs' | 'triggers' | 'all'
if (!target) {
  console.error('Usage: ts-node scripts/seed.ts <users|logs|triggers|all>');
  process.exit(1);
}

const pick = (): string[] => {
  if (target === 'users') return ['001_seed_default_user.sql'];
  if (target === 'logs') return ['002_seed_mock_logs.sql'];
  if (target === 'triggers') return ['003_seed_auto_disconnect_stale_sessions.sql'];
  if (target === 'all') return [
    '001_seed_default_user.sql',
    '002_seed_mock_logs.sql',
    '003_seed_auto_disconnect_stale_sessions.sql'
  ];
  throw new Error('Unknown seed target: ' + target);
};

async function runSeeds() {
console.log('Running seeds...');

  try {
for (const file of pick()) {
  const sql = fs.readFileSync(path.join(SEEDS_DIR, file), 'utf8');
  console.log(`>> Running seed: ${file}`);
      await pool.query(sql);
}

console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runSeeds();

