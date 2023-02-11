import colorServiceModel from "../isService/color"
import axios from "../model/axios"
import api from "../model/api"
class colorService implements colorServiceModel {
    listquery() {
        return axios({
            method: "get",
            url: api.color.list
        })
    }
    add(data: any) {
        return axios({
            method: "post",
            url: api.color.add,
            data
        })
    }
}
export default new colorService()