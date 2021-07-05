<template>
  <div class="dashboard-container">
    <div class="dashboard-text"> Welecom To Online Education Platform!</div>
    <el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"><img :src="this.list[0].image" alt=""><div><router-link :to="'/course/detail/'+this.list[0].id">
                <a id="name" href="">{{this.list[0].name}}</a>
              </router-link><div id="count"><span>学习人数：</span><span>{{list[0].add_count}}</span></div></div></div></el-col>

  <el-col :span="6"><div class="grid-content bg-purple"><img :src="this.list[1].image" alt=""><div><router-link :to="'/course/detail/'+this.list[1].id">
                <a id="name" href="">{{this.list[1].name}}</a>

              </router-link><div id="count"><span>学习人数：</span><span>{{list[1].add_count}}</span></div></div></div></el-col>


              <el-col :span="6"><div class="grid-content bg-purple"><img :src="this.list[2].image" alt=""><div><router-link :to="'/course/detail/'+this.list[2].id">
                <a id="name" href="">{{this.list[2].name}}</a>

              </router-link><div id="count"><span>学习人数：</span><span>{{list[2].add_count}}</span></div></div></div></el-col>


              <el-col :span="6"><div class="grid-content bg-purple"><img :src="this.list[3].image" alt=""><div><router-link :to="'/course/detail/'+this.list[3].id">
                <a id="name" href="">{{this.list[3].name}}</a>
              </router-link><div id="count"><span>学习人数：</span><span>{{list[3].add_count}}</span></div></div></div></el-col>


</el-row>
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"><img :src="this.list[4].image" alt=""><div><router-link :to="'/course/detail/'+this.list[4].id">
                <a id="name" href="">{{this.list[4].name}}</a>
              </router-link><div id="count"><span>学习人数：</span><span>{{list[4].add_count}}</span></div></div></div></el-col>


  <el-col :span="6"><div class="grid-content bg-purple"><img :src="this.list[5].image" alt=""><div><router-link :to="'/course/detail/'+this.list[5].id">
                <a id="name" href="">{{this.list[5].name}}</a>
              </router-link><div id="count"><span>学习人数：</span><span>{{list[5].add_count}}</span></div></div></div></el-col>


              <el-col :span="6"><div class="grid-content bg-purple"><img :src="this.list[6].image" alt=""><div><router-link :to="'/course/detail/'+this.list[6].id">
                <a id="name" href="">{{this.list[6].name}}</a>
              </router-link><div id="count"><span>学习人数：</span><span>{{list[6].add_count}}</span></div></div></div></el-col>


              <el-col :span="6"><div class="grid-content bg-purple"><img :src="this.list[7].image" alt=""><div><router-link :to="'/course/detail/'+this.list[7].id">
                <a id="name" href="">{{this.list[7].name}}</a>
              </router-link><div id="count"><span>学习人数：</span><span>{{list[7].add_count}}</span></div></div></div></el-col>
</el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import course from '@/api/edu/course'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return {
      name:store.getters.token,
      list:null
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){            
            course.showCourse()  //首页展示
            .then(response=>{
                this.list=response.data           
            })
            .catch(error=>{console.log(error);})
        }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-row {
    margin-top: 100px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  img {
    width: 297px;
    height: 200px;
  }
  #name {
    margin-left: 10px;
    font-size: 20px;
    line-height: 46px;
  }
  #count {
    font-weight: 100;
    font-size: 15px;
    color:#757679;
    padding-bottom: 10px!important;
    padding-left: 180px;
  }

</style>
