import request from '@/utils/request'

export default {
    // 课程分类列表
    getSubjectList(){
        return request({
            // url: '/vue-admin-template/table/list',
            url:`/subject/getAllSubject`,
            method: 'get',
           
          })
    },
    
}

