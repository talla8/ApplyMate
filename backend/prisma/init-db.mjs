import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const databaseUrl = process.env.DATABASE_URL ?? 'file:./dev.db';
const relativePath = databaseUrl.replace(/^file:/, '');
const databasePath = resolve(process.cwd(), 'prisma', relativePath);
const migrationPath = resolve(
  process.cwd(),
  'prisma/migrations/202606282020_init/migration.sql',
);

const db = new DatabaseSync(databasePath);
const sql = readFileSync(migrationPath, 'utf8');

db.exec('PRAGMA foreign_keys = ON;');
db.exec(sql);
db.close();

console.log(`Initialized SQLite database at ${databasePath}`);
