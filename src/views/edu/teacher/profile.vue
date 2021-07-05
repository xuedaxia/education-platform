<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="">
        <!-- <pan-thumb image="'/teacher.jpeg'" /> -->
         <img src="./teacher.jpeg" style="width:200px;height:200px"></img>
      </el-form-item>
      <!--

v-show：是否显示上传组件

:key：类似于id，如果一个页面多个图片上传控件，可以做区分

:url：后台上传的url地址

@close：关闭上传组件

@crop-upload-success：上传成功后的回调 -->

      <!-- <image-cropper
        v-show="imagecropperShow"
        :width="300"
        :height="300"
        :key="imagecropperKey"
        url="teacher.jpeg"
        field="file"
        @close="close"
        @crop-upload-success="cropSuccess"
      /> -->

      <!-- <div>
        
      </div> -->
      <el-form-item label="工号">
        {{teacher.username}}
      </el-form-item>
      <el-form-item label="姓名">
        {{teacher.name}}
      </el-form-item>

      <el-form-item label="邮箱">
        {{teacher.email}}
      </el-form-item>

      <el-form-item label="电话">
       {{teacher.phone}}
      </el-form-item>

      <el-form-item label="专业">
       {{teacher.major}}
      </el-form-item>
      
      
      <el-form-item>
        <router-link :to="'/teacher/edit'">
                <el-button type="primary" size="mini" icon="el-icon-edit" >
                    修改
                </el-button>
       </router-link>
      </el-form-item>
       
    </el-form>
  </div>
</template>

<script>
import store from '@/store'
import teacherApi from "@/api/edu/teacher";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
export default {
  components: {
    PanThumb,
    ImageCropper,
  },
  data() {
    return {
      teacher: {
        
        username: "",
        name:"",
        phone: 0,
        email:"",
        major: "",
        avatar: "",
      },
      saveBtnDisabled: false,
      imagecropperShow: false, //上传组件是否显示
      imagecropperKey: 0, //上传组件key值,组件的唯一标识
      BASE_API: '',
      id:1
      
    };
  },
  watch: {
    //监听
    $route(to, from) {
      //路由变化方式
      this.init();
    },
  },
  methods: {
    close() {
      //关闭上传弹框
      this.imagecropperShow=false;
      //上传组件初始化
      this.imagecropperKey+=1;

    },
    cropSuccess(data) {
      //上传弹框成功
      this.student.avater=data.url;
      this.imagecropperShow=false;
      this.imagecropperKey+=1;
    },
    init() {
      // if (this.$route.params && this.$route.params.id) {

       
        
    
        this.getInfo();
        this.id = this.teacher.username;
      
    },
    getInfo() {
      teacherApi.getTeacherInfo().then((response) => {
        
        this.teacher = response.data;
      });
    },
    

  },
  created() {
    this.init();

  },
  mounted(){
    
  }
};
</script>

<style>
</style>