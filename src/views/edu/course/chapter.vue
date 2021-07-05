<template>
   <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>

      <el-step title="创建课程大纲"/>

      <el-step title="最终发布"/>

    </el-steps>

    <el-button type="text" @click="openChapterDialog">添加章节</el-button>
    
<!-- 章节 -->
<ul class="chanpterList">
    <li
        v-for="chapter in chapterVideoList"
        :key="chapter.id">
        <p>
           <span class="title">{{ chapter.title }}</span> 
            
            <span class="acts">
                <el-button style="" type="text" @click="openVideo(chapter.id)">添加小节</el-button>
                
                <el-button style="" type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
                <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
            </span>
           
        </p>
        <!-- 视频 -->

        <ul class="chanpterList videoList">
            <li
                v-for="video in chapter.children"
                :key="video.id">
                <p>
                  {{ video.title }}
                <el-button style="" type="text" @click="openEditVideo(video.id)" style="float:right">编辑</el-button>
                <el-button style="" type="text" @click="removeVideo(video.id)" style="float:right">删除</el-button>
                </p>
            </li>
        </ul>
    </li>
</ul>


    <el-form label-width="120px">

      <el-form-item>

        <el-button @click="previous">上一步</el-button>

        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>

      </el-form-item>

    </el-form>
    
<!-- 添加和修改章节表单 -->
<el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
    <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
            <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
    </div>
</el-dialog>

<!-- 添加和修改课时表单 -->
<el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
  <el-form :model="video" label-width="120px">
    <el-form-item label="课时标题">
      <el-input v-model="video.title"/>
    </el-form-item>
    <el-form-item label="课时排序">
  <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
    </el-form-item>
    <el-form-item label="是否免费">
      <el-radio-group v-model="video.free">
        <el-radio :label="true">免费</el-radio>
        <el-radio :label="false">默认</el-radio>
      </el-radio-group>
    </el-form-item>
      <el-form-item label="上传视频">
        <!-- before-remove是删除时的弹框-->
    <el-upload
           :on-success="handleVodUploadSuccess"
           :on-remove="handleVodRemove"
           :before-remove="beforeVodRemove"
           :on-exceed="handleUploadExceed"
           :file-list="fileList"
           :action="BASE_API+'/admin/vod/video/upload'"
           :limit="1"
           class="upload-demo">
    <el-button size="small" type="primary">上传视频</el-button>
    <el-tooltip placement="right-end">

        <div slot="content">最大支持1G，<br>
            支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
            GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
            MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
            SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
        <i class="el-icon-question"/>
    </el-tooltip>
    </el-upload>
</el-form-item>
   
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
    <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'
export default {
   data() {
    return {
      saveBtnDisabled: false,
      courseId:'',
      chapterVideoList:[],
      chapter:{//封装章节数据
        title:"",
        sort:0
      },
      video:{
        title:'',
        sort:0,
        free:0,
        videoSourseId:'',
        videoOrignalName:''//视频名称
      },
      dialogChapterFormVisible:false,//章节弹框
      dialogVideoFormVisible:false,//小节弹框

      fileList:[],//上传文件列表
      BASE_API:''
    };
  },
  created() {
    //获取路由的id值
    if(this.$route.params&&this.$route.params.id){
      this.courseId=this.$route.params.id
      this.getChapterVideo()
    }

   
  },
  methods: {

    //点确定调用
    handleVodRemove(){
      //调用接口的删除视频的方法
      video.deleteVod(this.video.videoSourseId)
      .then(response=>{
        this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //文件列表清空
          this.fileList=[];
          this.video.videoSourseId='';
          this.video.videoOrignalName='';
      })
    },
    //点击x调用
    beforeVodRemove(file,fileList){
      return this.$confirm(`确定移除${file.name}?`)
    },
    //上传视频成功时调用的方法
    handleVodUploadSuccess(respons,file,fileList){

      this.vido.videoSourseId= response.data.videoId;
      this.video.videoOriginalName=file.name;
    },
    handleUploadExceed(){
      this.$message.warning('请先删除已上传的视频')
    },
    //=======================================小节====================
removeVideo(id){
  this.$confirm('此操作将永久删除小节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          video.deleteVideo(id)
          .then(response=>{
            //
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
             //刷新页面
        this.getChapterVideo()
          }).catch(

          )
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
},
 openVideo(chapteId){
    //弹框
    this.dialogVideoFormVisible=true
    this.video.chapterId=chapterId

  },
  addVideo(){
    this.video.courseId=this.courseId
    video.addVideo(this.video)
    .then(response=>{
      //关闭弹框
        this.dialogVideoFormVisible=false
        
        //提示
        this.$message({
          type:'success',
          message:'添加小节成功'
        })
         //刷新页面
        this.getChapterVideo()
         //清空video
        this.video={}
      })
    
  },
   //修改小节的方法
    updateVideo(){
      video.updateVideo(this.video)
      .then(
        response=>{
           //关闭弹框
        this.dialogVideoFormVisible=false
        
        //提示
        this.$message({
          type:'success',
          message:'修改小节成功'
        })
        //刷新页面
        this.getChapterVideo()

        //清空video
        this.video={}
        }
      )
    },
    //修改小节弹框数据回显
    openEditVideo(videoId){
      this.dialogVideoFormVisible=true
      //调用接口
      video.getVideo(videoId)
      .then(response=>{
        this.video=response.data.video
      })
    },
      
  saveOrUpdateVideo(){
    if(!this.video.id){
        this.addVideo()
      }else {
        this.updateVideo()
      }

  },








//==============================================================================================


    
    //删除章节
    removeChapter(chapterId){
       this.$confirm('此操作将永久删除章节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          chapter.deleteChapter(chapterId)
          .then(response=>{
            //
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
             //刷新页面
        this.getChapterVideo()
          }).catch(

          )
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
          
        },
    //修改章节弹框数据回显
    openEditChapter(chapterId){
      this.dialogChapterFormVisible=true
      //调用接口
      chapter.getChapter(chapterId)
      .then(response=>{
        this.chapter=response.data.chapter
      })
    },
      //弹出添加章节弹框
      openChapterDialog(){
        this.dialogChapterFormVisible=true
        this.chapter.title='';
        this.chapter.sort=0
      },
    //添加章节
    addChapter(){
        //设置课程id到chapter对象里面
      this.chapter.courseId=this.courseId
      chapter.addChapter(this.chapter)
      .then(reponse=>{
        //关闭弹框
        this.dialogChapterFormVisible=false
        
        //提示
        this.$message({
          type:'success',
          message:'添加章节成功'
        })
         //刷新页面
        this.getChapterVideo()
        //清空chapter
        this.chapter={}
      })
    },

    //修改章节的方法
    updateChapter(){
      chapter.updateChapter(this.chapter)
      .then(
        response=>{
           //关闭弹框
        this.dialogChapterFormVisible=false
        
        //提示
        this.$message({
          type:'success',
          message:'修改章节成功'
        })
        //刷新页面
        this.getChapterVideo()

        //清空chapter
        this.chapter={}
        }
      )
    },
    saveOrUpdate(){
      if(!this.chapter.id){
        this.addChapter()
      }else {
        this.updateChapter()
      }
      
    },
    //根据课程id查询章节和小节
      getChapterVideo(){
        chapter.getAllChapterVideo(this.courseId)
        .then(response=>{
         this.chapterVideoList= response.data.allChapterVideo
        })
      },
      previous(){
          this.$router.push({path:'/course/info/'+this.courseId})
          // this.$router.go(-1)
      },
    next() {
      //跳转到第二步
      this.$router.push({ path: "/course/publish/"+this.courseId});
    },
  },
}
</script>

<style scoped>
.chanpterList{
    position: relative; 
    list-style: none;
    margin: 0;
    padding: 0;
} 

/* .chanpterList li{ */
  /* position: relative; */
  /* display: block; 
}*/
.chanpterList p {
  /* float: left; */
  /* position: absolute;  */
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
} 

.chanpterList .acts {
    float: right;
    font-size: 14px;
    
}



.videoList{
  padding-left: 50px;
}
.videoList p{
  /* float: left; */
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
} 
</style>