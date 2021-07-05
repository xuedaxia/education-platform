<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布课程"/>
    </el-steps>
    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div class="main">
        <h2>课程标题:{{ coursePublish.name }}</h2>
        <p>课程号：{{ coursePublish.cno}}</p>
        <p>课程教师：{{ coursePublish.owner_name }}</p>
      </div>
    </div>
    <div>
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
    </div>
  </div>
</template>

<script>
import course from '@/api/edu/course'
export default {
   data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId:'',
      coursePublish:{
        
      }
    }
  },
  created() {
    //获取路由课程id
    if(this.$route.params&&this.$route.params.id){
      this.courseId=this.$route.params.id
      //调用接口方法根据课程id查询
      this.getCoursePublishId()
    }
    
  
  },
  methods: {
    getCoursePublishId(){
      course.getPublishCourseInfo(this.courseId)
      .then(response=>{
        this.coursePublish=response.data.publishCourse
      })
    },
    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/chapter/1' })
    },
    publish() {
      course.publishCourse(this.courseId)
      .then(response=>{
        //提示信息
        this.$message({
          type:'success',
          message:'课程发布成功'
        })
        //跳转课程列表页面
        this.$router.push({ path: '/course/list' })
      })
      
    }
  }
};
</script>

<style scoped>
</style>
