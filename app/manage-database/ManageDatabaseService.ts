import { DatabaseDetails } from "../models/DatabaseDetails";
import { ManageDatabaseData } from "./ManageDatabaseData";

export class ManageDatabaseService {

  async getDatabaseDetailsById(id: string): Promise<ManageDatabaseData> {
    const response: Response = await fetch('/api/databases');
    const databaseDetails: DatabaseDetails = await response.json() as DatabaseDetails;
    return {
      database: databaseDetails
    }
  }

}