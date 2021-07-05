import request from '@/utils/request'

export default {
    // 课程分类列表
    addCourseInfo(courseInfo){
        return request({
            // url: '/vue-admin-template/table/list',
            url:`/course/`,
            method: 'post',
            data:courseInfo
           
          })
    },
    //查询所有讲师
    getListTeacher(){
        return request({
            // url: '/vue-admin-template/table/list',
            url:`/teacher/findAll`,
            method: 'get',
        
           
          })
    },
    //根据课程id查询课程基本信息
    getCourseInfoId(id){
        return request({
            url:`/course/${id}`,
            method:'get'
        })
    },

    //修改课程信息
    updateCourseInfo(courseInfo,courseid){
        return request({
            url:`/course/${courseid}`,
            method:'put',
            data:courseInfo
        })
    },

    //课程确认信息
    getPublishCourseInfo(id){
        return request({
            url:`/course/getPublishCourseInfo/${id}`,
            method:'get',
           
        })
    },
    //课程最终发布
    publishCourse(id){
        return request({
            url:`/course/publishCourse/${id}`,
            method:'post',
           
        })
    },

    //课程列表
    getListCourse(current,limit,courseQuery){
        return request({
            url:`/course?current=${current}&limit=${limit}&query=${courseQuery.query}`,
            method:'get',
            
        })
    },
    deleteCourseId(id){
        return request({
            // url: '/vue-admin-template/table/list',
            url:`/course/${id}`,
            method: 'delete',
            //后端使用RequestBody获取数据
        })
    },
    uploadSourse(sourse){
        return request({
            url:`/course/uploadSourse`,
            method:'post',
            data:sourse
           
        })
    },
    showCourse(){
        return request({
            url:`/course/recommend`,
            method:'get',
           
        })
    },
    getSourceList(id){
        return request({
            url:`/course/resource/?id=${id}`,
            method:'get',
           
        })
    },
    downloadSourse(id){
        return request({
            url:`/course/resource/download/${id}`,
            method:'get',           
        })
    },
    joinCourse(id){
        return request({
            url:`/course/add/`,
            method:'post', 
            data:{
               course_id: id
            }          
        })
    },
    getjoinCourse(){
        return request({
            url:`/user/course/`,
            method:'get',           
        })
    },
    removejoinCourse(){
        return request({
            url:`/course/removeMycourse`,
            method:'delete',           
        })
    },
    getVideoList(){
        return request({
            url:`/course/removeMycourse`,
            method:'delete',           
        })
    }
}