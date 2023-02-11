import sourceServiceModel from "../isService/source"
import axios from "../model/axios"
import api from "../model/api"
class sourceService implements sourceServiceModel {
    listquery() {
        return axios({
            method: "get",
            url: api.source.list
        })
    }
    add(data: any) {
        return axios({
            method: "post",
            url: api.source.add,
            data
        })
    }
}
export default new sourceService()