<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="教师姓名">
        <el-input v-model="teacher.name" />
      </el-form-item>

      <!-- <el-form-item label="教师工号">
        <el-input v-model="teacher.username" />
      </el-form-item> -->
      <el-form-item label="教师邮箱">
        <el-input v-model="teacher.email" />
      </el-form-item>
      <el-form-item label="教师电话">
        <el-input v-model="teacher.phone"  />
      </el-form-item>
      <el-form-item label="教师专业">
        <el-input v-model="teacher.major"  />
      </el-form-item>
      <el-form-item label="教师性别">
        <el-radio v-model="teacher.sex" label="0">男</el-radio>
      <el-radio v-model="teacher.sex" label="1">女</el-radio>
      </el-form-item>
      <!-- <el-form-item label="教师头像">
        <pan-thumb :image="teacher.avatar" /> 
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
      this.teacher.avater=data.url;
      this.imagecropperShow=false;
      this.imagecropperKey+=1;
    },
    init() {
      // if (this.$route.params && this.$route.params.id) {
        
        this.getInfo();
      // } else {
      //   this.teacher = {};
      // }
    },
    getInfo() {
      teacherApi.getTeacherInfo().then((response) => {
        
        this.teacher = response.data;
      });
    },
    // saveOrUpdate() {
    //   //判断添加还是修改，根据teacher是否有id
    //   if (!this.teacher.id) {
    //     this.saveTeacher();
    //   } else {
    //     this.updateTeacher();
    //   }
    // },
    
    save() {
      teacherApi.updateTeacherInfo(this.teacher).then((response) => {
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