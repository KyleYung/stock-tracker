import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("stocks.db");

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tracked_stocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      symbol TEXT NOT NULL UNIQUE,
      name TEXT,
      added_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS latest_quotes (
      symbol TEXT PRIMARY KEY,
      price REAL NOT NULL,
      change REAL,
      change_pct REAL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS price_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      symbol TEXT NOT NULL,
      timeframe TEXT NOT NULL,
      ts INTEGER NOT NULL,
      close REAL NOT NULL
    );
  `);
}

export { db };