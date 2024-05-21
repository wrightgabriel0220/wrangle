import Database from "@tauri-apps/plugin-sql";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as schema from "../db/schema";

export type SelectQueryResult = {
  [key: string]: any;
};

export const sqlite = await Database.load("sqlite:wrangle.db");

export const db = drizzle<typeof schema>(
  async (sql, params, method) => {
    let rows: any = [];
    let results: any = [];

    if (isSelectQuery(sql)) {
      rows = await sqlite.select(sql, params).catch((err) => {
        console.error("SQL Error: ", err);
        return [];
      });
    } else {
      rows = await sqlite.execute(sql, params).catch((err) => {
        console.error("SQL Error: ", err);
        return [];
      });
      return { rows: [] };
    }

    console.log("rows: ", rows);

    rows = rows.map((row: any) => {
      return Object.values(row);
    });

    results = method === "all" ? rows : rows[0];

    console.log("results: ", results);

    return { rows: results };
  },
  { schema: schema, logger: true }
);

/**
 * Checks if the given SQL query is a SELECT query.
 * @param sql The SQL query to check.
 * @returns True if the query is a SELECT query, false otherwise.
 */
function isSelectQuery(sql: string): boolean {
  const selectRegex = /^\s*SELECT\b/i;
  return selectRegex.test(sql);
}
