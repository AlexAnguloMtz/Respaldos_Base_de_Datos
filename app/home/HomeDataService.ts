import { HomeData } from "./HomeData";

export class HomeDataService {

  getHomeData(): Promise<HomeData> {
    return new Promise((res, _) => {
      setTimeout(() => {
        return res({
          databases: [
            {
              dbms: 'PostgreSQL',
              version: 16.0,
              users: 5,
              tables: 10
            },
            {
              dbms: 'MySQL',
              version: 8.3,
              users: 7,
              tables: 20
            }
          ]
        });
      }, 1500);
    })
  }

}