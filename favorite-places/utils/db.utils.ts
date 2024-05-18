import * as DBLite from "expo-sqlite"; // NOTE: not naming this 'SQLite' because the Q button on my keyboard is broken
import { Place } from "../models/place.model";

let placesDB: DBLite.SQLiteDatabase;

export let isDBOpen = false;

export async function initDB() {
  placesDB = await DBLite.openDatabaseAsync("places.db"); // creates this db first time; opens this db every time after that
  isDBOpen = true;

  const [result, error] = await cRunAsync(
    placesDB,
    `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imgUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )`
  );

  return [result as DBLite.SQLiteRunResult, error];
}

export async function insertPlace(place: Place) {
  if (!isDBOpen) {
    console.error("ERROR: Database is not open. Unable to perform insert.");
    return [undefined, "DB_NOT_OPEN"];
  }

  const { id: _id, imageUri, address, location, title } = place;
  const { latitude, longitude } = location;

  const [result, error] = await cRunAsync(
    placesDB,
    `INSERT INTO places (
      title, imgUri, address, lat, lng
    ) VALUES (?, ?, ?, ?, ?)`,
    [title, imageUri, address, latitude, longitude]
  );

  return [result as DBLite.SQLiteRunResult, error];
}

export async function closeDB() {
  placesDB.closeSync();
  isDBOpen = false;
}

async function cRunAsync(
  db: DBLite.SQLiteDatabase,
  query: string,
  insertVals: Array<any> = []
) {
  if (!db || !query) {
    return [undefined, "DB or query not correct."];
  }

  let result: DBLite.SQLiteRunResult | undefined, error: unknown;

  await db.withTransactionAsync(async () => {
    try {
      result = await db.runAsync(query, insertVals);
    } catch (e) {
      error = e;
    }
  });

  return [result as DBLite.SQLiteRunResult, error];
}
