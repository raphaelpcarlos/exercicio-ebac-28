import { group } from 'k6';
import Login from '../request/login.request';
import data from '../data/usuarios.json'
import User from '../request/user.request';
import Produtos from '../request/produtos.request';
import Clients from '../request/clientes.request';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5s', target: 50 },
        { duration: '10s', target: 10 },
        { duration: '5s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99) < 1000']
    }
}

export default function () {

    let login = new Login()
    let user = new User()
    let product = new Produtos()
    let client = new Clients()

    group('login and get token', () => {
        login.access(data.usuarioOk.user, data.usuarioOk.pass)
    })

    group('list users', () => {
        user.list(login.getToken())
    })

    group('list produtos', () => {
        product.list(login.getToken())
    })

    group('list clientes', () => {
        client.list(login.getToken())
    })
}