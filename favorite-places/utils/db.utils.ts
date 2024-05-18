import * as DBLite from "expo-sqlite"; // NOTE: not naming this 'SQLite' because the Q button on my keyboard is broken

let placesDB: DBLite.SQLiteDatabase;

export async function initDB() {
  placesDB = await DBLite.openDatabaseAsync("places.db"); // creates this db first time; opens this db every time after that

  let result: DBLite.SQLiteRunResult | undefined, error: unknown;

  await placesDB.withTransactionAsync(async () => {
    try {
      result = await placesDB.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imgUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )
    `);
    } catch (e) {
      error = e;
    }
  });

  return [result, error];
}
