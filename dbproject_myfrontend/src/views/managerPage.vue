<template>
    <div class="layout-container-demo">
      <el-container>
        <el-header style="text-align: right;{color:#66b1ff} font-size: 12px" >
            <el-input v-model="inputVal"  style="margin-right: 8px;width: 180px;top:10px; margin-top: 1px"  placeholder="Type to search" />
        </el-header>
        <el-container>
        <el-aside class = "aside" width="200px">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          @select="handleSelect"
        >
          <el-menu-item 
            top:80px index="1">User Information</el-menu-item>
          <el-menu-item index="2">album information</el-menu-item>
          <el-menu-item index="3">music information</el-menu-item>
          <el-menu-item index="4">Release request</el-menu-item>
          <el-menu-item index="5">Release album</el-menu-item>
        </el-menu>
            </el-aside>
            <el-main>
            <el-scrollbar_user v-if="table==1">
            <el-table :data="Userdata" stripe style="width: 100%" fit = "true" max-height="1250" >
            <el-table-column fixed prop="id" label="ID" width="150" />
            <el-table-column prop="username" label="name" width="120" />
            <el-table-column prop="email" label="email" width="120" />
            <el-table-column prop="role" label="role" width="120" />
            <el-table-column fixed="right" label="Operations" width="120">
            <template #default="scope">
                <el-button
                link
                type="primary"
                size="small"
                @click.prevent="deleteRow(scope.row.id)"
                >
                Remove
                </el-button>
            </template>
            </el-table-column>
        </el-table>
          </el-scrollbar_user>
          <!-- album information -->
          <el-scrollbar_user v-if="table==2">
            <el-table :data="filterTableData_album" stripe style="width: 100%" fit = "true" max-height="1250" >
            <el-table-column fixed prop="id" label="ID" width="100" />
            <el-table-column prop="album" label="album" width="200" />
            <el-table-column prop="artist_name" label="artist name" width="200" />
            <el-table-column prop="artist_id" label="artist id" width="200" />
            <el-table-column prop="time" label="last time" width="200" />
            <el-table-column fixed="right" label="Operations" width="100">
            <template #default="scope">
                <el-button
                link
                type="primary"
                size="small"
                @click.prevent="deleteRow(scope.row.id)"
                >
                Remove
                </el-button>
            </template>
            </el-table-column>
        </el-table>
          </el-scrollbar_user>
          <!-- music information -->
          <el-scrollbar_user v-if="table==3">
            <el-table :data="tableData_music" stripe style="width: 100%" fit = "true" max-height="1250" >
            <el-table-column fixed prop="id" label="ID" width="100" />
            <el-table-column prop="name" label="music" width="200" />
            <el-table-column prop="musician" label="artist" width="200" />
            <el-table-column prop="album" label="album" width="200" />
            <el-table-column prop="time" label="last play time" width="200" />
            <el-table-column fixed="right" label="Operations" width="100">
            <template #default="scope">
                <el-button
                link
                type="primary"
                size="small"
                @click.prevent="deleteRow(scope.row.id)"
                >
                Remove
                </el-button>
            </template>
            </el-table-column>
        </el-table>
          </el-scrollbar_user>
          <!-- request -->
          <el-scrollbar_user v-if="table==4">
            <el-table :data="tableData_new" stripe style="width: 100%" fit = "true" max-height="1250" >
            <el-table-column prop="id" label="ID" width="100" />
            <el-table-column prop="album" label="album" width="200" />
            <el-table-column prop="artist_name" label="artist name" width="200" />
            <el-table-column prop="music_name" label="music name" width="200" />
            <el-table-column prop="music_url" label="music url" width="300" />
            <el-table-column fixed="right" label="Operations" width="100">
            <template #default="scope">
                <el-button
                link
                type="primary"
                size="small"
                @click.prevent="agree_new(scope.row.id)"
                >
                confirm
                </el-button>
            </template>
            </el-table-column>
        </el-table>
          </el-scrollbar_user>
          <el-uploads v-if= "table==5">
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
        </el-container>
      </el-container>
    </div>
  </template>
  

  <script lang="ts" setup>
    import { ref,watch,reactive,onMounted,nextTick,computed} from 'vue'
    import axios from 'axios'
    import dayjs from 'dayjs'
    import { Menu as IconMenu, Message, Setting, SetUp } from '@element-plus/icons-vue'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { method } from 'lodash-es'
    import {userIfo,musicianIfo,albumIfo,musicIfo,releaseNew,newMusicIfo, identifyNew} from '@/api/managerApi'

    //data
    let inputVal = ref("")
    const table = ref(1);
    let Userdata= reactive([])
    let showtable = ref([])
    const activeIndex = ref('1')
    const handleSelect = async (key: string, keyPath: string[]) => {
        console.log(key, keyPath);
        if(key=='1'){
            table.value = 1
        }
        else if(key=='2'){
            table.value = 2;
            tableData_album = reactive([])
            //let tableData_musician : any[];
            const res:any = await albumIfo();
            res.albums.forEach(function(item:any,index:any){
                tableData_album.push({
                id : res.albums[index].album.id,
                artist_name : res.albums[index].artist_name,
                artist_id : res.albums[index].album.artist_id,
                album : res.albums[index].album.name,
                time : res.albums[index].album.last_playback
              })
            },
            )
        }
        else if(key=='3'){
            table.value = 3;
            tableData_music = reactive([])
            const res:any = await musicIfo();
            res.tracks.forEach(function(item:any,index:any){
                tableData_music.push({
                id : res.tracks[index].track.id,
                name : res.tracks[index].track.name,
                time : res.tracks[index].track.last_playback,
                musician : res.tracks[index].artist_name,
                album: res.tracks[index].album_name
              })
            },
            )
        }else if(key=='4'){
            table.value = 4;
            tableData_new = reactive([])
            const res:any = await newMusicIfo();
            res.albums.forEach(function(item:any,index:any){
                tableData_new.push({
                id:res.albums[index].album.id,
                album : res.albums[index].album.name,
                artist_name : res.albums[index].artist_name,
                music_name : res.albums[index].tracks[0].name,
                music_url : res.albums[index].tracks[0].url,
              })
            },
            )
        }else{
            table.value=5
        }
        console.log(table)
}
    let reqInstance = axios.create({
        headers:{
             Authorization:"Bearer "+localStorage.getItem("token")
        }
    })


    let refreshdata = function(){
        reqInstance.get("http://106.53.113.59:7878/user/all").then(res=>{
            Userdata = res.data.users
        })
    }
    reqInstance.get("http://106.53.113.59:7878/user/all").then(res=>{
            console.log("res:",res.data);
            Userdata = res.data.users;
            console.log("Userdata: ",Userdata)
        })

  
  //const now = new Date()
  const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
  const deleteRow = ( id : number) => {
    ElMessageBox.confirm(
    'proxy will permanently delete the user, Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
        ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
      reqInstance.delete("http://106.53.113.59:7878/user/"+id).then(res=>{
      console.log("delete response: ",res)
      console.log("delete id:  ",id);
      refreshdata();
  })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
//method
const search = ref('')

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
const handleEdit_album = (index: number) => {
  
}
const handleDelete_album = (index: number) => {
  
}
//单曲data
const filterTableData_new = computed(() =>
    tableData_music.filter(
    (data:any) =>
      !search_music.value ||
      data.name.toLowerCase().includes(search_music.value.toLowerCase())
  )
)
let tableData_new  = reactive([])
//单曲method
const agree_new = (albumId:number) => {
  ElMessageBox.confirm(
    'proxy will release this album, Continue?',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }
  )
    .then(() => {
        ElMessage({
        type: 'success',
        message: 'release completed',
      })
      identifyNew(albumId)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'release canceled',
      })
    })
}
//新专辑data
const search_music = ref('')
const filterTableData_music = computed(() =>
    tableData_music.filter(
    (data:any) =>
      !search_music.value ||
      data.name.toLowerCase().includes(search_music.value.toLowerCase())
  )
)
let tableData_music  = reactive([])
//新专辑method
const Play_music = (index: number) => {
  table.value = 1
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
  const res = await releaseNew({
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
  .layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-menu-demo{
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .aside {
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-menu {
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-main {
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
    height:700px;
  }
  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }
  </style>
  