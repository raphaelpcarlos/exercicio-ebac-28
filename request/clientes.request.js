import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Clients {
    list(token) {
        let response = http.get(`${Utils.getBaseUrl()}/customers`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        check(response, { 'listagem deve retornar 200': r => r && r.status === 200 })
    }
}

