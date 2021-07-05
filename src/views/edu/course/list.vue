<template>
    <div class="app-container">
        课程列表
        <el-form :inline="true"  class="demo-form-inline">
  <el-form-item >
    <el-input v-model="courseQuery.query" placeholder="课程名称"></el-input>
  </el-form-item>
  <!-- <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
    <el-option value="Normal" label="已发布" />
    <el-option value="Draft" label="未发布" />
  </el-select> -->
    <el-button type="primary" icon="el-icon-search" style="margin-left: 10px" @click="getList()">查询</el-button>
    <el-button type="default"  @click="resetData()">清空</el-button>
 
 </el-form>
        <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
       
        label="序号"
        width="100">
        <template slot-scope="scope">
            {{(page-1)*limit+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="课程名称"
        width="250">
      </el-table-column>
     
      <el-table-column
        prop="owner_name"
        label="教师"
        width="180">
      </el-table-column>
    
    <el-table-column
        prop="creat_time"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="add_count"
        label="学习人数"
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        align="center"
        >
        <template slot-scope="scope">
          <!-- 路由跳转 -->
            <router-link :to="'/course/info/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit" >
                    编辑信息
                </el-button>
              </router-link>
              <router-link :to="'/course/save/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit" >
                    上传资源
                </el-button>
              </router-link>
                <!-- <el-button type="danger" size="mini" icon="el-icon-delete" @click.prevent="removeDataById(scope.row.id)">
                    删除课程
                </el-button> -->
            
            
        </template>
        
      </el-table-column>
      </el-table>
    <div class="pagination">
      <el-pagination
   background
   :current-page="page"
   :page-size="limit"
   :total="total"
   layout="total,prev, pager, next,jumper"   
  @current-change="getList"
  >
</el-pagination>
    </div>
    </div>
</template>

<script>
import course from '@/api/edu/course'
export default {
    data(){
        return {
            list:null,
            page:1,
            limit:6,
            total:2,
            courseQuery:{
              query:''
            }
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(page=1){
            this.page=page
            course.getListCourse(this.page,this.limit,this.courseQuery)
            .then(response=>{            
                this.list=response.data
                this.total=response.total
            })
            .catch(error=>{console.log(error);})
        },
        resetData(){//清空
          this.courseQuery.query='';
          this.getList();
        },
        // removeDataById(id){
        //   this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   course.deleteCourseId(id)
        //   .then(response=>{
        //     //
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
        //     this.getList()
        //   }).catch(

        //   )
          
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
        // });
          
        // }
        
    }
}
</script>

<style>
  .pagination{
    margin: 50px;
    height: 100px;
  }
</style>