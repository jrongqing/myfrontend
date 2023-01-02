import axios from '@/utils/http'
//注册接口
export function register(params:any){
    return axios({
        url:'http://106.53.113.59:7878/auth/register',
        method:'post',
        data:params
    })
}

//登录接口
export function login(params:any){
    return axios({
        url:'http://106.53.113.59:7878/auth/login',
        method:'post',
        data:params
    })
}