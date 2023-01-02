import axios from '@/utils/http'

// 查询{音乐家名称}=>{音乐家，专辑}
export function musicianIfo(){
    return axios({
        url:'http://106.53.113.59:7878/artist/all',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'get'
    })
}
// {专辑id}=>{专辑包含音乐名称}
export function albumIfo(params:any){
    return axios({
        url:'http://106.53.113.59:7878/album/all',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'get'
    })
}
// 单曲查询
export function musicIfo(){
    return axios({
        url:'http://106.53.113.59:7878/track/all',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'get'
    })
}
// 播放功能{时间，音乐id}=>(修改数据)
export function musicPlay(params:any){
    return axios({
        url:'http://106.53.113.59:7878/auth/register',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'post',
        data:params
    })
}
// 收藏：{专辑id}=>{做出修改}
export function star(params:any){
    return axios({
        url:'http://106.53.113.59:7878/favorite_albums/'+params,
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'post',
        data:params
    })
}
//删除收藏

export function showStar(){
    return axios({
        url:'http://106.53.113.59:7878/favorite_albums',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'get'
    })
}
// 评论专辑：{专辑id,message}
export function comments(params:any){
    return axios({
        url:'http://106.53.113.59:7878/comment'+params.id,
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'post',
        data:params
    })
}
// 用户发布{艺术家名称，音乐名称，专辑名称，url}
export function newMusicIfo(params:any){
    return axios({
        url:'http://106.53.113.59:7878/album',
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'post',
        data:params
    })
}