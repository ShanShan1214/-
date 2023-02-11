import Iuserservice from "../isService/useinfos"
import axios from "../model/axios"
import api from "../model/api"
class UserService implements Iuserservice {
    login(params: any) {
        return axios(
            {
                method: "get",
                url: api.user.login,
                params
            }
        )
    }
}
export default new UserService()