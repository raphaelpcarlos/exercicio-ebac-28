import http, { request } from 'k6/http';
import Utils from '../utils/utils';
import { check } from 'k6';

export default class Login {
    #token

    acess(user, pass) {
        let response = http.post(`${Utils.getBaseUrl() / Login}`, JSON.stringify(
            {
                "username": user,
                "password": pass
            }
        ), {
            headers: { "Content-Type": "application/json", "Accept": "application/json" }
        })
        this.#token = response.json('acessToken')
        check(request, {
            "is status 201": (r) => r.status === 201
        })
    }

    getToken(){
        return this.#token
    }
}
