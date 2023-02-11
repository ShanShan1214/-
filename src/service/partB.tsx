import PartBServiceModel from "../isService/partB"
import axios from "../model/axios"
import api from "../model/api"
class PartbService implements PartBServiceModel {
    listquery() {
        return axios({
            method: "get",
            url: api.partB.list
        })
    }
    add(data: any) {
        return axios({
            method: "post",
            url: api.partB.add,
            data
        })
    }
}
export default new PartbService()