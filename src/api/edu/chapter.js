import request from '@/utils/request'

export default {
    // 根据课程id获取章节小节
    getAllChapterVideo(courseId){
        return request({
            // url: '/vue-admin-template/table/list',
            url:`/chapter/getChapterVideo/${courseId}`,
            method: 'get',         
          })
    },
    //添加章节
    addChapter(chapter){
        return request({
            // url: '/vue-admin-template/table/list',
            url:`/chapter/addChapter`,
            method: 'post', 
            data:chapter        
          })
    },
    //根据id查询章节
    getChapter(chapterId){
        return request({
            url:`/chapter/getChapterInfo/`+chapterId,
            method: 'get', 
        })
    },
    //修改章节
    updateChapter(chapter){
        return request({
            url:`/chapter/updateChapter`,
            method: 'post', 
            data:chapter
        })
    },
    //删除章节
    deleteChapter(chapterId){
        return request({
            url:`/chapter/${chapterId}`,
            method: 'delete', 
        })
    },
}