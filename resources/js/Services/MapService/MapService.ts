import {Service} from "typedi";
import axios, {AxiosResponse} from "axios";
import {MapResponse} from "@/Interfaces/Site/MapResponse/MapResponse";

@Service()
class MapService {
    getLocationData = (lng: number, lat: number) => {
        return axios.get<MapResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAP}`,
            {
                headers: {
                    'Accept' : 'application/json',
                    'With-Credentials': false,
                    'x-requested-with': false,
                }
            }
        )
    }
}

export default MapService;
