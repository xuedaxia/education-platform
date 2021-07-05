<template>
    <div class="app-container">
        讲师列表
        <el-form :inline="true"  class="demo-form-inline">
  <el-form-item >
    <el-input v-model="teacherQuery.name" placeholder="教师名"></el-input>
  </el-form-item>
  <el-form-item label="添加时间">
    <el-date-picker v-model="teacherQuery.begin" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"
    default-time="00:00:00" />
  </el-form-item>
  <el-form-item >
    <el-date-picker v-model="teacherQuery.end" type="datetime" placeholder="选择截止时间" value-format="yyyy-MM-dd HH:mm:ss"
    default-time="00:00:00" />
  </el-form-item>
 
    <el-button type="primary" icon="el-icon-search"  @click="getList()">查询</el-button>
    <el-button type="default"  @click="resetData()">清空</el-button>
 
 </el-form>
        <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="教工号"
        width="180">
        <template slot-scope="scope">
            {{(page-1)*limit+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业"
        width="180">
      </el-table-column>
    
    <el-table-column
        prop="Create_time"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        width="60">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        align="center"
        >
        <template slot-scope="scope">
          <!-- 路由跳转 -->
            <router-link :to="'/teacher/edit/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit" >
                    修改
                </el-button>
              </router-link>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click.prevent="removeDataById(scope.row.id)">
                    删除
                </el-button>
            
            
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
import teacher from '@/api/edu/teacher'
export default {
    data(){
        return {
            list:null,
            page:1,
            limit:10,
            total:0,
            teacherQuery:{}
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(page=1){
            this.page=page;
            teacher.getTeacherListPage(this.page,this.limit,this.teacherQuery)
            .then(response=>{
                // console.log(response);
                this.list=response.data.rows
                this.total=response.data.total
               
            })
            .catch(error=>{console.log(error);})
        },
        resetData(){//清空
          this.teacherQuery={}
          this.getList();
        },
        removeDataById(id){
          this.$confirm('此操作将永久删除教师记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          teacher.deleteTeacherId(id)
          .then(response=>{
            //
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
            this.getList()
          }).catch(

          )
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
          
        }
    }
}
</script>

<style>
  .pagination{
    margin: 50px;
    height: 100px;
  }
</style>