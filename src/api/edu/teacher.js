import request from '@/utils/request'

export default {
    // current当前页 limit每页记录数 teacherQurey条件查询对象
    getTeacherListPage(current,limit,teacherQurey){
        return request({
            // url: '/vue-admin-template/table/list',
            url:`/teacher/${current}/${limit}`,//请求教师页面，todo
            method: 'get',
            //后端使用RequestBody获取数据
            //data表示吧对象转换成json传递到接口里面
            data:teacherQurey
          })
    },
    deleteTeacherId(id){
        return request({
            // url: '/vue-admin-template/table/list',
            url:`/teacher/${id}`,//删除教师，todo
            method: 'delete',
            //后端使用RequestBody获取数据
        })
    },
    addTeacher(teacher){
        return request({
            // url: '/vue-admin-template/table/list',
            url:`/teacher/addTeacher`,
            method: 'post',
            //后端使用RequestBody获取数据
            data:teacher
        })
    },
    getTeacherInfo(){//根据id查询教师
        return request({
            url:`/user/info/`,
            method: 'get',
           
        })
    },
    //修改教师
    updateTeacherInfo(info){
        return request({
            url:`/user/info/`,
            method: 'put',
            data: info
            
        })
    }
}

