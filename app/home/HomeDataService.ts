import { DatabaseDetails } from "../models/DatabaseDetails";
import { HomeData } from "./HomeData";

export class HomeDataService {

  async getHomeData(): Promise<HomeData> {
    const response: Response = await fetch('/api/databases');
    const databases: Array<DatabaseDetails> = await response.json() as Array<DatabaseDetails>;
    console.log('databases' + JSON.stringify(databases));
    return {
      databases
    }
  }

}