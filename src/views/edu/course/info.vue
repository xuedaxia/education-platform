<template>
  <div class="app-container">
    <h2 style="text-align: center">填写课程基本信息</h2>

    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <!-- <el-step title="填写课程基本信息" /> -->

      <!-- <el-step title="创建课程大纲" />

      <el-step title="最终发布" /> -->
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.name"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>
      <!-- 所属分类
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item> -->
      <!-- 课程讲师-->
      <el-form-item label="课程教师">
        <el-input
          v-model="courseInfo.owner_name"
          placeholder=""
        />
      </el-form-item>
      <!-- <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item> -->
      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
         
          <!-- 父子组件通信 -->
          <tinymce-editor :description="this.courseInfo.overview"
          @edit="handleEdit"
         v-model="courseInfo.overview"
        ></tinymce-editor>
        
      </el-form-item>
         
      <!-- <el-form-item label="课程封面">
        自动上传 
        <el-upload  
          :show-file-list= "false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="'/teacher'"
          class="avatar-uploader"
        >
          <!-- <img :src="courseInfo.cover" /> -->
        <!-- </el-upload>
      </el-form-item>   -->
  <el-form-item label="课程封面">
  <el-upload
  class="avatar-uploader"
  :action="'http://192.168.0.105:8000/course/upload'"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :data="this.courseInfo.name"
  :name="image"
  
 >
  <img v-if="this.courseInfo.image" :src="this.courseInfo.image" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
 </el-form-item>  


      <!-- <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item> -->
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";

import TinymceEditor from '@/components/Tinymce/tinymce-editor.vue';
export default {
  components:{
    
    TinymceEditor
  },
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: {
        name: "",
        // subjectId: "", //二级分类id
        // subjectParentId: "", //一级分类id
        owner_name: "",
        // lessonNum: 0,
        overview: "",
        image: "",//默认封面
        // price: 0,
      },
      courseId:'',
      // teacherList: [], //封装所有的讲师
      // subjectOneList: [],
      // subjectTwoList: [],
      imageUrl: '',
      
    };
  },
  created() {
    //获取路由中的id值
    if(this.$route.params&&this.$route.params.id){//id没值时添加，有值时回显
      this.courseId=this.$route.params.id;
      this.getInfo()
    } else {
      //初始化所有讲师
    // this.getListTeacher();
    // //初始化一级分类
    // this.getOneSubject();
    
    }

    

   
  },  
  watch: {
    //监听
    $route(to, from) {
      //路由变化方式
      this.init();
    },
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        this.getInfo();
      } else {
        this.courseInfo = {};
      }
    },
    //根据课程id查询信息（回显）
    getInfo(){
      course.getCourseInfoId(this.courseId)
      .then(response=>{
        this.courseInfo=response.data
        //查询所有分类，包含一级和二级
        // subject.getSubjectList()
        // .then(response=>{
        //   //获取所有一级分类
        //   this.subjectOneList=response.data.list
        //   // console.log(this.courseInfo.subjectParentId);
          
        //   //把所有一级分类数组进行遍历，比较当前courseInfo里面一级分类id和所有的一级分类id是否相同
        //   for(var i=0;i<this.subjectOneList.length;i++){
        //     //获取每个一级分类
        //     var oneSubject=this.subjectOneList[i];
        //     //比较当前courseInfo里面一级分类id和所有的一级分类id
        //     if(this.courseInfo.subjectParentId==oneSubject.id){
        //         //获取一级分类所有的二级分类
        //        this.subjectTwoList= oneSubject.children
               
        //     }
        //   }
        // })
        // //初始化所有讲师
        //  this.getListTeacher();
         
      })
    },
    //上传封面成功调用的方法
    handleAvatarSuccess(res, file) {
      this.courseInfo.image=res.image;
      this.imageUrl=res.image;
    },
    //上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // //点击某个一级分类，触发change，显示对应的二级分类
    // subjectLevelOneChanged(value) {
    //   //value就是点击的一级分类id值（框架封装好了）

    //   for (let i of this.subjectOneList) {
    //     var oneSubject = i;
    //     //判断和点击的一级分类id值是否相等
    //     if (value === oneSubject.id) {
    //       //获取二级分类
    //       this.subjectTwoList = oneSubject.children;
    //       //v-model双向绑定，所以要把二级分类id值清空
    //       this.courseInfo.subjectId = "";
    //     }
    //   }
    // },
    // //查询所有的一级分类
    // getOneSubject() {
    //   subject.getSubjectList().then((response) => {
    //     this.subjectOneList = response.data.list;
        
    //   });
    // },
    //查询所有的讲师
    // getListTeacher() {
    //   course.getListTeacher().then((response) => {
    //     this.teacherList = response.data.items;
    //   });
    // },
    //添加课程
    addCourse(){
      course.addCourseInfo(this.courseInfo).then((response) => {
        //提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //跳转到第二步
       
        this.$router.push({
          path: "/course/detail/" + response.id,
        }); //后端需要返回新添加的课程id
      });
    },
    //修改课程
    updateCourse(){
      course.updateCourseInfo(this.courseInfo,this.courseId)
      .then(response=>{
         this.$message({
          type: "success",
          message: "修改成功!",
        });
        //跳转到第二步
       
        this.$router.push({
          path: "/course/detail/" +this.courseId,
        }); //后端需要返回新添加的课程id
      })
    },
    saveOrUpdate() {
      //判断是添加还是修改
      if(!this.courseInfo.id){
        this.addCourse()
      } else {
        this.updateCourse()
      }
    },
    handleEdit(e){
      this.courseInfo.overview=e
      
    }
  },
};
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
