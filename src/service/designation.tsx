import designationServiceModel from "../isService/designation"
import axios from "../model/axios"
import api from "../model/api"
class designationService implements designationServiceModel {
    listquery() {
        return axios({
            method: "get",
            url: api.designation.list
        })
    }
    add(data: any) {
        return axios({
            method: "post",
            url: api.designation.add,
            data
        })
    }
}
export default new designationService()