import request from '@/utils/request'

export default {
    
   
    getStudentInfo(){//根据id查询学生
        return request({
            url:`/student/getStudent`,
            method: 'get',
           
        })
    },
    updateStudent(student){
        return request({
            url:`/student/updateStudent`,
            method: 'post',
            data:student
        })
    }
    
}

