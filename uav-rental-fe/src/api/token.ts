import axios from 'axios'
import { api_host } from './loginregister'



export async function testToken(token: string) {

    return axios.get('http://' + api_host + '/api/test-token/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })


}