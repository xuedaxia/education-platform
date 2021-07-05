<template>
  <div class="app-container">
   <h2>我发布的课程</h2> 
        <el-form :inline="true"  class="demo-form-inline">

 
 </el-form>
        <el-table
      :data="myCourseList"
      style="width: 100%">
      <el-table-column
       
        label="序号"
        width="80">
        <template slot-scope="scope">
            {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="课程名称"
        width="300">
      </el-table-column>
      
      <el-table-column
        prop="add_count"
        label="学习人数"
        width="100">
      </el-table-column>
    
      <el-table-column
        label="操作"
        width="400"
        align="center"
        >
        <template slot-scope="scope">
          <!-- 路由跳转 -->
            <router-link :to="'/course/detail/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit" >
                    查看
                </el-button>   
            </router-link>
            <router-link :to="'/course/save/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit" style="margin-left:10px">
                    上传资源
                </el-button>
              </router-link>
                <el-button type="danger" size="mini" icon="el-icon-delete" style="margin-left:10px" @click.prevent="removeDataById(scope.row.id)">
                    删除课程
                </el-button>

            
            
        </template>
        
      </el-table-column>
      </el-table>
    
  </div>
</template>

<script>

import course from "@/api/edu/course";
export default {
  data() {
    return {
      myCourseList: [        
          {
              id:12345,
              name:'javascript高级程序设计',
              owner_name:'阮一峰',
              add_count:10000
          }
      ],
      
      
    };
  },
  
  methods: {
  getjoinCourse(){
      course.getjoinCourse()
      .then(response=>{
        this.myCourseList=response.data
        
      })
    },
  removeDataById(id){
          this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          course.deleteCourseId(id)
          .then(response=>{
            //
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
            this.getjoinCourse()
          }).catch(

          )
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
          
        }
  },
  created() {
    this.getjoinCourse();

  },
  mounted(){
    
  }
};
</script>
    
<style >
.delete {
    margin-left: 30px!important;
}
</style>