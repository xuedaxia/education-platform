<template>
  <div class="app-container">
    <el-form label-width="120px">
      <!-- <el-form-item label="资源标题">
        <el-input
  type="textarea"
  :rows="5"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
      </el-form-item> -->

      <el-form-item label="选择文件">
        <el-upload
          ref="upload"
          
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="10"
          with-credentials="true"
          :action="'http://192.168.0.105:8000/course/uploadFiles/?id='+this.$route.params.id"
          name="file"
          :headers="importHeaders"
          accept=".rar,.zip,audio/*,video/*,image/*,.pptx,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        >
          <el-button slot="trigger" size="small" type="primary" @click="selected=!selected"
            >选取文件</el-button
          >

          <el-button
            :loading="loading"
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload">
            上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import courseApi from '@/api/edu/course'
import store from '@/store'

export default {
  data() {
    return {
      // BASE_API: VUE_APP_BASE_API, // 接口API地址
      OSS_PATH: '', // 阿里云OSS地址
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false,
      selected:false,
      sourceInfo:{},
      textarea:'',
      importHeaders: {}
    };
  },
  created() {
     var mytoken =  window.sessionStorage.getItem('token')
     this.importHeaders.Authorization=mytoken
  },
  methods: {
    //   点击上传
    submitUpload(){
      if(this.selected){
      this.importBtnDisabled=true;
      this.loading=true;
      this.$refs.upload.submit()
      }
      else {
        this.$message({
        type:'error',
        message:'请选择文件！'
      })
      }
    },
    //上传成功
    fileUploadSuccess(){
      this.loading=false;
      this.selected=false;
      console.log(store.getters.token);  
      this.$router.push({
          path: "/course/list" ,
        }); 
      
    },
    //上传失败
    fileUploadError(){
        this.loading=false;
        this.selected=false
        this.$message({
        type:'error',
        message:'上传文件失败'
      })
    }
  },
};
</script>

<style>
</style>