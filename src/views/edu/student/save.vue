<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="学生姓名">
        <el-input v-model="student.name" />
      </el-form-item>

      <!-- <el-form-item label="学生工号">
        <el-input v-model="student.username" />
      </el-form-item> -->
      <el-form-item label="学生邮箱">
        <el-input v-model="student.email" />
      </el-form-item>
      <el-form-item label="学生电话">
        <el-input v-model="student.phone"  />
      </el-form-item>
      <el-form-item label="学生专业">
        <el-input v-model="student.major"  />
      </el-form-item>
      <el-form-item label="学生性别">
        <el-radio v-model="student.sex" label="0">男</el-radio>
      <el-radio v-model="student.sex" label="1">女</el-radio>
      </el-form-item>
      <!-- <el-form-item label="学生头像">
        <pan-thumb :image="student.avatar" />
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像</el-button>
      </el-form-item> -->
      <!--

v-show：是否显示上传组件

:key：类似于id，如果一个页面多个图片上传控件，可以做区分

:url：后台上传的url地址

@close：关闭上传组件

@crop-upload-success：上传成功后的回调 -->

      <image-cropper
        v-show="imagecropperShow"
        :width="300"
        :height="300"
        :key="imagecropperKey"
        :url="BASE_API + '/teacher'"
        field="file"
        @close="close"
        @crop-upload-success="cropSuccess"
      />

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="save"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from "@/api/edu/teacher";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
export default {
  components: {
    PanThumb,
    ImageCropper,
  },
  data() {
    return {
       student: {
        username: "",
        name:"",
        phone: 0,
        email:"",
        major: "",
        avatar: "",
        sex:0
      },
      saveBtnDisabled: false,
      imagecropperShow: false, //上传组件是否显示
      imagecropperKey: 0, //上传组件key值,组件的唯一标识
      BASE_API: '',
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
     
        this.getInfo();
     
    },
   
      getInfo() {
      teacher.getTeacherInfo().then((response) => {
       this.student = response.data;
      });
    },
   
    
    save() {
      teacher.updateTeacherInfo(this.student).then((response) => {
        //提示信息
        this.$message({
          type: "success",
          message: "保存成功!",
        });
        //路由跳转
        this.$router.push({ path: "/profile/information" });
      });
      this.$router.push({ path: "/profile/information" });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style>
</style>