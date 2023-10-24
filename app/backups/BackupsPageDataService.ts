import { DatabaseBackup } from "../models/DatabaseBackup";
import { DatabaseDetails } from "../models/DatabaseDetails";
import { DatabaseSchema } from "../models/DatabaseSchema";

export class BackupsPageDataService {
  async createBackup(databaseId: string): Promise<Array<DatabaseBackup>> {
    const response: Response = await fetch(`/api/databases/new-backup?id=${databaseId}`, { method: 'POST' });
    const data = await response.json();
    return data.backups((each: any) => {
      return {
        id: each.id,
        creationDate: new Date(each.creationTimeStamp)
      }
    });
  }

  async getPageData(id: string): Promise<DatabaseDetails> {
    const response: Response = await fetch(`/api/databases?id=${id}&backups=true`);
    const data = await response.json();
    return {
      id: data.id,
      dbms: data.dbms,
      version: data.version,
      users: data.users,
      schemas: data.schemas.map((each: any) => each as DatabaseSchema),
      backups: data.backups.map((backup: any) => { return { id: backup.id, creationDate: new Date(backup.creationTimeStamp) } })
    }
  }

}