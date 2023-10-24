import { DatabaseSchema } from "../models/DatabaseSchema";
import { BackupsPageData } from "./BackupsPageData";

export class BackupsPageDataService {

  async getPageData(id: string): Promise<BackupsPageData> {
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