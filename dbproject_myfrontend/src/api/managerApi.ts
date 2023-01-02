import axios from '@/utils/http'
// 查询{}=>{用户信息}
export function userIfo(params:any){
    return axios({
        url:'http://106.53.113.59:7878/user/all',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'get',
        data:params
    })
}

// 查询{}=>{音乐家id,音乐家名称}
export function musicianIfo(){
    return axios({
        url:'http://106.53.113.59:7878/artist/all',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'get'
    })
}
// 查询{}=>{专辑id,专辑名称，音乐家名称,专辑评论,最进播放时间}
export function albumIfo(){
    return axios({
        url:'http://106.53.113.59:7878/album/all',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'get'
    })
}
// 查询{}=>{音乐id,音乐name,专辑名称，音乐家名称，最近播放时间}
export function musicIfo(params:any){
    return axios({
        url:'http://106.53.113.59:7878/track/all',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'get',
        data:params
    })
}
// 查询发布请求{}=>{新发布艺术家名称，艺术家id,}（按钮：管理员自己审核自己）
export function newMusicIfo(){
    return axios({
        url:'http://106.53.113.59:7878/album/unissued',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'get'
    })
}
//发布新专辑
export function releaseNew(params:any){
    return axios({
        url:'http://106.53.113.59:7878/album',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'post',
        data:params
    })
}

// 同意专辑发布请求
export function identifyNew(params:any){
    return axios({
        url:'http://106.53.113.59:7878/album/issue/'+params,
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'post',
        data:params
    })
}