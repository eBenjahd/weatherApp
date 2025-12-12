import { AxiosClient } from "../clients/axiosClient" 
import type CityResult from "../types/citySearch.interface";

async function GetCityData(name: string) : Promise<{results : CityResult[]}> {

    if (!name) return {results : []};

    const res = await AxiosClient.get("/search", {
        params: {
          name,
          count: 10,
        },
      });
  return res.data
}

export default GetCityData
