import request from '@/utils/request'

export default {
    // 根据课程id获取章节小节
    register(userInfo){
        return request({
            
            url:`/user/register`,
            method: 'post',      
            data:userInfo
          })
    },
}