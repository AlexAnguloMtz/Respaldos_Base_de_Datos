import { DatabaseSchema } from "./DatabaseSchema"

export type DatabaseDetails = {
  id: string,
  dbms: string,
  version: string,
  users: Array<String>,
  schemas: Array<DatabaseSchema>
}

export const countTables = (model: DatabaseDetails): number => {
  return model.schemas.flatMap((schema) => schema.tables).length;
}