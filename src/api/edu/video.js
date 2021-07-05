import request from '@/utils/request'

export default {
   
    //添加小节
    addVideo(video){
        return request({
            // url: '/vue-admin-template/table/list',
            url:`/video/addVideo`,
            method: 'post', 
            data:video        
          })
    },
   //根据id查询小节
   getVideo(videoId){
    return request({
        url:`/video/getVideoInfo/`+videoId,
        method: 'get', 
    })
},
    //修改小节
    updateVideo(video){
        return request({
            url:`/video/updateVideo`,
            method: 'post', 
            data:video
        })
    },
    //删除小节
    deleteVideo(id){
        return request({
            url:`/video/${id}`,
            method: 'delete', 
        })
    },
    //删除视频
    deleteVod(id){
        return request({
            url:`/video/removeVideo/${id}`,
            method: 'delete', 
        })
    },
}