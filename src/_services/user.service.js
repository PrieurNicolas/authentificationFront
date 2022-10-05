import Axios from "./caller.service";

let getAllusers = () => {
    return Axios.get('/api/utilisateur')
}

let getUser = (iud) => {
    return Axios.get('/api/utilisateur/' + uid)
}

export const userService = {
    getAllusers, getUser
}