import { Mastra } from '@mastra/core/mastra';

import { queryVectorAgent} from "./agents/query-vector-agent";
import { PgVector, PostgresStore } from "@mastra/pg";
//import {FinancialAgent} from "./agents/financial-agent";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "POSTGRES_CONNECTION_STRING environment variable is required"
  );
}
const pgVector = new PgVector({ connectionString });
const pgStorage = new PostgresStore({ connectionString });
export const mastra = new Mastra({
  agents: {
    queryVectorAgent,
  },
  vectors: {
    pg: pgVector,
  },
 
  storage: pgStorage,
});
