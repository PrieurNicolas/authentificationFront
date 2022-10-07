import Cookies from "js-cookie";
import Axios from "./caller.service";

let isLogged = () => {
    let accessToken = Cookies.get('accessToken')
    return !!accessToken
}

let getToken = () => {
    return Cookies.get('accessToken')
}

let getRToken = () => {
    return Cookies.get('refreshToken')
}

let getId = () => {
    return Cookies.get('id')
}

export const accountService = {
    isLogged, getToken, getRToken, getId
}