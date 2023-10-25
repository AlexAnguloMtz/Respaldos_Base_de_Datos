import { DatabaseBackup } from "./DatabaseBackup";
import { DatabaseSchema } from "./DatabaseSchema"

export type DatabaseDetails = {
  id: string,
  dbms: string,
  version: string,
  users: Array<String>,
  backups?: Array<DatabaseBackup>
  schemas: Array<DatabaseSchema>,
}

export const countTables = (model: DatabaseDetails): number => {
  return model.schemas.flatMap((schema: DatabaseSchema) => schema.tables).length;
}