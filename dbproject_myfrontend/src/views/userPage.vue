<template class = 'background'>
  <div class="layout-container-demo">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-input v-model="inputVal" @keyup.enter = "search_home()"  style="margin-right: 8px;width: 180px;top:10px; margin-top: 1px"  placeholder="Type to search" />
      </el-header>
      <el-container>
        <el-aside width="200px">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          @select="handleSelect"
        >
          <el-menu-item 
            top:80px index="1">Home Page</el-menu-item>
          <el-menu-item index="2">personal collection</el-menu-item>
          <el-menu-item index="3">musician query</el-menu-item>
          <el-menu-item index="4" disabled>album query</el-menu-item>
          <el-menu-item index="5">music query</el-menu-item>
          <el-menu-item index="6">upload new albums</el-menu-item>
        </el-menu>
            </el-aside>
        <el-container>
          <el-main>
            <el-music-play v-if = "table==1">
            <el-carousel :interval="5000"  height="450px" arrow = "always" >
              <div class = "block">
                <el-carousel-item v-for="item in 6" :key="item">
                <img :src="imgArr[item-1]" @click="pictureClick(item-1)" style="width: 1340px; height: 450px">
                </el-carousel-item>
          </div>       
            </el-carousel>
            <!-- <img src="http://p1.music.126.net/fq1O8ZRT5_FHzg_uLEtUQA==/109951167773880633.jpg?param=640y300"> -->
            </el-music-play>
            <el-personal-collection class = "collection" v-if = "table==2">
              <el-table :data="filterTableData_collection" style="width: 100%">
                <el-table-column label="musician" prop="musician" />
                <el-table-column label="album" prop="album" />
                <el-table-column align="right">
                  <template #header>
                    <el-input v-model="search_collection" size="small" placeholder="Type to search" />
                  </template>
                  <template #default="scope">
                    <el-button size="small" @click="Open_collection(scope.$index, scope.row)"
                      >open</el-button
                    >
                    <el-button
                      size="small"
                      type="danger"
                      @click="Delete_collection(scope.$index, scope.row)"
                      >Delete</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-personal-collection>
            <el-musician v-if="table==3">
              <el-table :data="filterTableData_musician" style="width: 100%">
                <el-table-column label="musician" prop="musician" />
                <el-table-column label="album" prop="album" />
                <el-table-column label="featured Reviews" prop="comments" />
                <el-table-column align="right">
                  <template #header>
                    <el-input v-model="search_musician" size="small" placeholder="Type to search" />
                  </template>
                  <template #default="scope">
                    <el-button size="small" @click="open_musician(scope.$index, scope.row)"
                      >open</el-button
                    >
                    <el-button size="small" @click="makeComments_musician(scope.$index, scope.row)"
                      >make comments</el-button
                    >
                    <el-button
                      size="small"
                      @click="collection_musician(scope.$index, scope.row)"
                      >collection</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-musician>
            <el-album v-if="table==4">
              <el-table :data="filterTableData_album" style="width: 100%">
                <el-table-column label="music name" prop="name" />
                <el-table-column align="right">
                  <template #header>
                    <el-input v-model="search_album" size="small" placeholder="Type to search" />
                  </template>
                  <template #default="scope">
                    <el-button size="small" @click="Play_music(scope.$index, scope.row)"
                      >Play</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-album>
            <el-music v-if="table==5">
              <el-table :data="filterTableData_music" style="width: 100%">
                <el-table-column label="music name" prop="name" />
                <el-table-column align="right">
                  <template #header>
                    <el-input v-model="search_music" size="small" placeholder="Type to search" />
                  </template>
                  <template #default="scope">
                    <el-button size="small" @click="Play_music(scope.musician, scope.album)"
                      >play</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-music>
            <el-uploads v-if = "table==6">
              <el-form :model="form" label-width="120px">
                <el-form-item label="Artist nmae">
                  <el-input v-model="form.artist" />
                </el-form-item>
                <el-form-item label="Musci name">
                  <el-input v-model="form.music" />
                </el-form-item>
                <el-form-item label="Album name">
                  <el-input v-model="form.album" />
                </el-form-item>
                <el-form-item label="music url">
                  <el-input v-model="form.url" />
                </el-form-item>
                <el-form-item label="music type">
                  <el-select v-model="form.types" placeholder="please select your music type">
                    <el-option label="Pop&Rock" value="Pop&Rock" />
                    <el-option label="Electronic" value="Electronic" />
                    <el-option label="Jazz" value="Jazz" />
                    <el-option label="Absolute Music" value="Absolute Music" />
                    <el-option label="Rap" value="Rap" />
                    <el-option label="Folk" value="Folk" />
                    <el-option label="Metal" value="Metal" />
                    <el-option label="Classical" value="Classical" />
                    <el-option label="Indie" value="Indie" />
                    <el-option label="others" value="others" />
                  </el-select>
                </el-form-item>
                <el-form-item label="self made">
                  <el-switch v-model="form.made" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">Create</el-button>
                  <el-button>Cancel</el-button>
                </el-form-item>
              </el-form>
            </el-uploads>
            </el-main>
            <el-footer v-if = "table==1">
            <div>
              <el-row :gutter="12" class="txt">
                <el-col :span="6" class = "txt1">
                  <el-card class = "txt1" shadow="never"> song: {{songIfo.name}} </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card class = "txt1" shadow="never"> artist: {{songIfo.artist}} </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card class = "txt1" shadow="never"> time:{{songIfo.lenth}} </el-card>
                </el-col>
              </el-row>
            </div>
            <div class="audio_con">
                <audio :span = "24" ref='audio' @play="play" @pause="pause" :src= "musicurl" controls autoplay loop class="myaudio"></audio>
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref,watch,reactive,computed,onMounted } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { Menu as IconMenu, Message, Setting, SetUp } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {musicianIfo,albumIfo,musicPlay,musicIfo,star,showStar,comments,newMusicIfo} from '@/api/userApi'

//all data
let inputVal = ref("")
const songIfo = reactive({
  name:"谢谢",
  artist:"KOKIA",
  lenth:"4:10"
})
const table = ref(1)
const activeIndex = ref('1')
const Audio = document.getElementById("audio")
interface User {
  date: string
  name: string
  address: string
}

const pause = ref()

const imgArr = [
  "http://p1.music.126.net/VnHahOfZLUwsbniNyJCEHg==/109951168168868779.jpg?imageView&quality=89",//天黑黑 早安 「超时空恋语·新千禧」音乐企划
  "http://p1.music.126.net/k4ntiy6vLAjzRtias8zRMg==/109951168166431056.jpg?imageView&quality=89",//PLANET ラムジ  3ラムジ
  "http://p1.music.126.net/lsDIcfojP-2W8PUoYRHHZg==/109951168160937459.jpg?imageView&quality=89",//谢谢 KOKIA ありがとう…/ 愛しているから
  "http://p1.music.126.net/ERfiFCbVxfhzX4FP8cvI6w==/109951168168829370.jpg?imageView&quality=89",//眼泪记得你 孙盛希  眼泪记得你
  "http://p1.music.126.net/ThkFbdlD8gwwenQaYcJcWQ==/109951168168880073.jpg?imageView&quality=89",//没什么能给你 张艺兴 没什么能给你
  "http://p1.music.126.net/sM17F7839iu_iXPw54pfhA==/109951168172296598.jpg?imageView&quality=89"//last dance 伍佰 爱情的尽头
]
const musicurl = ref("")
const musicArr = [
"http://music.163.com/song/media/outer/url?id=2007984952.mp3",//天黑黑
"http://music.163.com/song/media/outer/url?id=812400.mp3",//PLANET
"http://music.163.com/song/media/outer/url?id=543798303.mp3",//谢谢
"http://music.163.com/song/media/outer/url?id=2008726921.mp3",//眼泪记得你 孙盛希  眼泪记得你
"http://music.163.com/song/media/outer/url?id=2004935914.mp3",//没什么能给你 张艺兴 没什么能给你
"http://music.163.com/song/media/outer/url?id=157276.mp3"//last dance
]

const songName  = ["天黑黑","PLANET","谢谢","眼泪记得你","没什么能给你","last dance"]
const songArtist = ["早安","ラムジ","KOKIA","孙盛希","张艺兴","伍佰"]
const songLenth = ["3:45","4:03","4:10","4:04","4:14","4:32"]

//all method
const search_home = function(){

}
const play = function(){
  console.log("play")
}
const pictureClick = function(item:any){
  musicurl.value = musicArr[item]
  songIfo.name = songName[item]
  songIfo.artist = songArtist[item]
  songIfo.lenth = songLenth[item]
}

const handleSelect = async (key: string, keyPath: string[]) => {
        console.log(key, keyPath);
        if(key=='1'){
            table.value = 1;
        }
        else if(key=='2'){
            table.value = 2;
            tableData_collection = reactive([]);
            const res:any = await showStar();
            console.log("res: ",res)
            res.albums.forEach(function(item:any,index:any){
              // tableData_musician[index].musician = res.albums[index].artist_name;
              // tableData_musician[index].album = res.albums[index].album.name;
              // tableData_musician[index].comments = res.albums[index].coments
                tableData_collection.push({
                musician : res.albums[index].artist_name,
                album : res.albums[index].album.name
              })
              collection_album_id[index] = res.albums[index].album.id
            },
            )
            console.log(album_id)
            //tableData_musician = res.albums
        }
        else if(key=='3'){
            tableData_musician = reactive([])
            table.value = 3;
            //let tableData_musician : any[];
            const res:any = await albumIfo();
            console.log("res: ",res)
            res.albums.forEach(function(item:any,index:any){
              // tableData_musician[index].musician = res.albums[index].artist_name;
              // tableData_musician[index].album = res.albums[index].album.name;
              // tableData_musician[index].comments = res.albums[index].coments
                tableData_musician.push({
                musician : res.albums[index].artist_name,
                album : res.albums[index].album.name,
                comments : res.albums[index].comments[res.albums[index].comments.length-1].body
              })
                album_id[index] = res.albums[index].album.id
            },
            )
            console.log(album_id)
            //tableData_musician = res.albums
        }else if(key=='4'){
            table.value = 4
        }else if(key=='5'){
            table.value = 5
            tableData_music = reactive([])
            const res:any = await musicIfo();
            console.log("res: ",res.tracks[0].track.name)
            res.tracks.forEach(function(item:any,index:any){
              // tableData_musician[index].musician = res.albums[index].artist_name;
              // tableData_musician[index].album = res.albums[index].album.name;
              // tableData_musician[index].comments = res.albums[index].coments
                tableData_music.push({
                name : res.tracks[index].track.name
              })
            },
            )
            console.log("table music: ",tableData_music)

        }else{
          table.value = 6
        }
        console.log(table)
}

//收藏data
interface collection {
  musician: string
  album: string
}
const search_collection = ref('')
const filterTableData_collection = computed(() =>
  tableData_collection.filter(
    (data:any) =>
      !search_collection.value ||
      data.album.toLowerCase().includes(search_collection.value.toLowerCase())
  )
)
let tableData_collection = reactive([])
//收藏method
const Open_collection = async (index: number, row: User) => {
  table.value = 4
  tableData_album = reactive([])
  const res:any = await axios({
        url:'http://106.53.113.59:7878/album/'+collection_album_id[index],
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'get'
    })
  res.albums[0].tracks.forEach(function(item:any,index1:any){
      tableData_album.push({
      name : res.albums[0].tracks[index1].name
    })
  },
  )
}
const Delete_collection = (index: number, row: User) => {
  console.log(index, row)
}

//音乐家data
interface musician {
  musician: string
  album: string
  comments:string
}
const search_musician = ref('')

const filterTableData_musician = computed(() =>
    tableData_musician.filter(
    (data:any) =>
      !search_musician.value ||
      data.musician.toLowerCase().includes(search_musician.value.toLowerCase())
  )
)
let tableData_musician  = reactive([])
let album_id = ref([])
let collection_album_id = ref([])
//音乐家method
const open_musician =async (index: number, row: User) => {
  console.log(index, row)
  console.log("album id: ",album_id[index])
  table.value = 4
  tableData_album = reactive([])
  const res:any = await axios({
        url:'http://106.53.113.59:7878/album/'+album_id[index],
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'get'
    })
  console.log("mesaage: ",res.albums[0].tracks)
  res.albums[0].tracks.forEach(function(item:any,index1:any){
      tableData_album.push({
      name : res.albums[0].tracks[index1].name
    })
  },
  )
  console.log("table music: ",tableData_music)
}
const makeComments_musician = (index: number, row: User) => {
  ElMessageBox.prompt('Please input your comments', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputErrorMessage: 'Invalid Email',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: "You have make a comment successful!",
        // comments()
      })
      axios({
        url:'http://106.53.113.59:7878/comment/'+album_id[index],
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")},
        method:'post',
        data:{
              "comment": {
              "body": value
              }
            }
    })
  })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}
const collection_musician = async (index: number, row: User) => {
  ElMessage({
    showClose: true,
    message: 'Successful collection!',
    type: 'success',
  })
  const res:any = await star(album_id[index])
  console.log("album_id[index]: ",album_id[index])
}

//专辑data
const search_album = ref('')
const filterTableData_album = computed(() =>
    tableData_album.filter(
    (data:any) =>
      !search_album.value ||
      data.name.toLowerCase().includes(search_album.value.toLowerCase())
  )
)
let tableData_album = reactive([])
//专辑method
const handleEdit_album = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete_album = (index: number, row: User) => {
  console.log(index, row)
}

//单曲data
interface music {
  name: string
}
const search_music = ref('')
const filterTableData_music = computed(() =>
    tableData_music.filter(
    (data:any) =>
      !search_music.value ||
      data.name.toLowerCase().includes(search_music.value.toLowerCase())
  )
)
let tableData_music  = reactive([])
//单曲method
const Play_music = (index: number, row: User) => {
  table.value = 1
  musicurl.value = "http://music.163.com/song/media/outer/url?id=2007984952.mp3"
  songIfo.name = "天黑黑"
  songIfo.artist = "早安"
  songIfo.lenth = "3:45"
}


//上传data
const form = reactive({
  artist: '',
  music: '',
  album: '',
  url: '',
  types: '',
  made:'',
})
//上传method
const onSubmit = async () => {
  ElMessage({
    showClose: true,
    message: 'Successful submit!',
    type: 'success',
  })
  const res:any = await newMusicIfo({
    "new_album": {
        "artist_name":form.artist,
        "album_name": form.album,
        "tracks": [
            {
            "name": form.music,
            "url": form.url
            }
        ]
    }
})
}
</script>


<style scoped>
.layout-container-demo.el-carousel__item {
  background-color:var(--el-color-primary-light-7)
}

.background{
  background-color: #66b1ff;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #66b1ff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 30%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
  }
  .layout-container-demo .el-menu-demo{
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-menu {
    border-right: none;
  }
  .layout-container-demo .el-main {
    padding: 0;
    height:500px;
    background:var(--el-color-primary-light-8)
  }
  ::v-deep.layout-container-demo.clooection{
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-footer {
    padding: 0;
    height:200px;
    position: bottom ;
    background:var(--el-color-primary-light-8)
  }
  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }

  .txt{
    left:200px;
    background-color: var(--el-color-primary-light-8);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .txt1{
    background-color: var(--el-color-primary-light-8);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .audio_con {
    left:40px;
    height: 50px;
    background-color: var(--el-color-primary-light-8);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}

.myaudio {
    left:250px;
    position: absolute;
    align-self: center;
    width: 1250px;
    height: 40px;
    margin-top: 5px;
    outline: none;
    background-color: var(--el-color-primary-light-8);
}
</style>