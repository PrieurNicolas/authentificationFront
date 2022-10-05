import Cookies from "js-cookie";
import Axios from "./caller.service";

let isLogged = () => {
    let accessToken = Cookies.get('accessToken')
    return !!accessToken
}

let getToken = () => {
    return Cookies.get('accessToken')
}

export const accountService = {
    isLogged, getToken
}