import axios from 'axios'
const API = axios.create({
    baseURL:'http://106.53.113.59:7878/healthcheck2',
    timeout:2000
})

export default API