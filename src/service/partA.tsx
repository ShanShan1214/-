import PartaServiceModel from "../isService/partA"
import axios from "../model/axios"
import api from "../model/api"
class PartaService implements PartaServiceModel {
    listquery() {
        return axios({
            method: "get",
            url: api.partA.list
        })
    }
    add(data: any) {
        return axios({
            method: "post",
            url: api.partA.add,
            data
        })
    }
}
export default new PartaService()