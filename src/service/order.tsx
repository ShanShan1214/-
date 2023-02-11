import ListServiceModel from "../isService/list"
import axios from "../model/axios"
import api from "../model/api"
class ListService implements ListServiceModel {
    listquery(info?:any) {
        return axios({
            method: "get",
            url: api.order.list,
            params:info

        })
    }
    add(data: any) {
        return axios({
            method: "post",
            url: api.order.add,
            data
        })
    }
}
export default new ListService()