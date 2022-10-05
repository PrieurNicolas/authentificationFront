import axios from "axios";
import Cookies from "js-cookie";
import { accountService } from "./account.service";

const Axios = axios.create({
    baseURL: 'http://localhost:5000'
})



Axios.interceptors.request.use(request => {

    if(accountService.isLogged()){
    request.headers.Authorization = 'Bearer '+accountService.getToken()
}

    return request
})


export default Axios