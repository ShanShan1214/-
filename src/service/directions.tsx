import directionsServiceModel from "../isService/directions"
import axios from "../model/axios"
import api from "../model/api"
class directionService implements directionsServiceModel {
    listquery() {
        return axios({
            method: "get",
            url: api.directions.list
        })
    }
    add(data: any) {
        return axios({
            method: "post",
            url: api.directions.add,
            data
        })
    }
}
export default new directionService()