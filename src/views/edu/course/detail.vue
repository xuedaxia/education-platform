<template>
   <div class="app-container">
    <div class="info">
     <div class="img"><img :src="this.courseInfo.image" alt=""></div> 
      <div class="describe">
        <div class="name" >
          {{courseInfo.name}}
        </div>
        <div class="teacher">
          教师：
          {{courseInfo.owner_name}}
        </div>
        <div class="hot">
          <span>学习人数：</span>
          <span>{{courseInfo.add_count}}</span>
        </div>
        <div class="add">
          <el-button v-if="flag == 0" type="danger" @click="join()" :disabled="!isStudent">
          加入课程
        </el-button>
        <el-tag v-else >已加入该课程</el-tag>
        </div>
        
      </div>
      
    </div>
    <div class="intro">
      <h3>简介</h3>
      <p>{{courseInfo.overview}}</p>
    </div>
    <h3>课程视频</h3>
   
    <div class="drop">
      <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    选择视频<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                 <span id="title" style="margin-left:20px">{{videoList.length!=0?videoList[0].name:''}}</span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item v-for="(video,index) in videoList" :key="index" :command="index" >{{video.name}}</el-dropdown-item>
                </el-dropdown-menu>
      </el-dropdown>

    </div>
    <div id="player">
      <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions">

    </video-player>
    </div>
    <div class="source">
      <h3>课程资源</h3>
      <el-table
    :data="sourceList"
    style="width: 100%">
    <el-table-column
      label="资源名称"
      width="300">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="上传时间"
      width="180">
      <template slot-scope="scope">        
          <div slot="reference" class="name-wrapper">
            <el-tag type="warning">{{ scope.row.upload_time }}</el-tag>
          </div>      
      </template>
    </el-table-column>
    <el-table-column
      label="下载次数"
      width="180">
      <template slot-scope="scope">        
          <div slot="reference" class="name-wrapper">
            <el-tag type="warning">{{ scope.row.download_count }}</el-tag>
          </div>      
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">

         <el-button 
          size="mini" type="primary" round
          @click="handleDownload(scope.$index, scope.row)">下载</el-button>
      
      </template>
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>

<script>
import course from "@/api/edu/course";
import store from '@/store'
import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
  components:{
    videoPlayer
  },
   data() {
    return {
      courseId:'',
      courseInfo: {
        name: "",
        owner_id: "",
        overview: "",
        add_count:0,
        owner_name:"",
      },
      sourceList:[//资源列表
      // {
      //   id:111,
      //   name:"实验报告模板",
      //   count:1234
      // }
      ],
      
      flag:0,//0为未加入该课程,
      isStudent:store.getters.token=='student-token'?true:false,

      playerOptions: {

playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度

autoplay: false, //如果true,浏览器准备好时开始回放。

muted: false, // 默认情况下将会消除任何音频。

loop: false, // 导致视频一结束就重新开始。

preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）

language: "zh-CN",

aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）

fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。

sources: [

{

type: "video/mp4",

src: "", //视频url地址

},

],

poster: "/dashbor/cloud.png", //你的封面地址

// width: document.documentElement.clientWidth,

notSupportedMessage: "本课程暂无视频", //允许覆盖Video.js无法播放媒体源时显示的默认信息。

controlBar: {

timeDivider: true,

durationDisplay: true,

remainingTimeDisplay: false,

fullscreenToggle: true, //全屏按钮

},
    },
    videoList:[
      {
        id:'',
        name:'视频1',
        path:'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      },
      {
        id:'',
        name:'视频2',
        path:'',
      },
      {
        id:'',
        name:'视频3',
        path:'',
      },

    ]
    };
  },
  created() {
    //获取路由的id值
    if(this.$route.params&&this.$route.params.id){
      this.courseId=this.$route.params.id
      this.getInfo()
      this.getjoinCourse(this.courseId)
      this.getSource()  //获取资源
      
    }
   
  },
  methods: {

    
    getInfo(){
      course.getCourseInfoId(this.courseId)
      .then(response=>{
        this.courseInfo=response.data   
        
        })
    },
    
    getSource(){
      course.getSourceList(this.courseId)
      .then(
        response=>{
        this.sourceList=response.data
        this.videoList=response.video
        if(this.videoList.length!=0){
          this.playerOptions.sources[0].src=this.videoList[0].path;
        }
        }
      )
    },
    
    handleDownload(index, row) {//下载资源
      //   course.downloadSourse(row.id)//传入资源id
      // .then(response=>{
        let a = document.createElement('a')
        a.href ="http://192.168.0.105:8000/course/resource/download/"+row.id;
        a.click();
      //   this.$message({
      //   type:'success',
      //   message:'下载成功'
      // })
      
      // })
    },
    join(){
      course.joinCourse(this.courseId)
      .then(response=>{
        this.$message({
        type:'success',
        message:'加入课程成功'
      })
      this.flag=1;
      })
    },
    getjoinCourse(courseId){
      
      if(this.isStudent){
        course.getjoinCourse(this.courseId)
      .then(response=>{
               
        this.flag=response.is_add
       
      
      })
     
      }
      
    },
    handleCommand(command) {
        this.playerOptions.sources[0].src=this.videoList[command].path;
        document.getElementById('title').textContent=this.videoList[command].name;
      },
    
  },
}
</script>

<style scoped>
.info {
    height: 300px;
    width: 1150px;
}
.img {
  float: left;
}
.info img {
  width: 500px;
  height: 300px;

}

.describe{
  float: right;
  height: 300px;
  width: 600px;
  /* margin-left: 50px; */
  padding: 20px !important; 
  background-color: rgb(248, 246, 246);
}

.name {
  font-size: 40px;
  font-weight: 500;
}

.hot {
  margin-top: 50px;
  color: rgb(135, 135, 136);
}

.teacher {
  color: rgb(48, 43, 43);
  font-weight: 400;
  font-size: 25px;
  height: 80px;
  line-height: 80px;
}

.add {
  height:80px;
  padding-left: 400px;
  padding-top: 40px;
}

.intro h3{
  font-weight: 700;
}

.source {
  margin-top: 50px;
}

.source h3{
  font-weight: 700;
}

 #player {
    width: 700px;
    height: 400px;
    margin-left: 300px;
  }
  .vjs-icon-placeholder {
    margin-left: 200px;
  height: 50px;
  width: 50px;
  line-height: 50px;
  
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.drop{
  margin-bottom: 10px;
  margin-left: 300px;
}
</style>