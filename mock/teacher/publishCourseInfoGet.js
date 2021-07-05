const Mock = require('mockjs')

const data = Mock.mock({
  
    publishCourse: {
        name:"vue",
        cno:111111,
        owner_name:"小王",
        lessonNum:12345,
        subjectLevelOne:12345,
        subjectLevelTwo:123451,       
    },

})

module.exports = [
  {
    url: '/course/getPublishCourseInfo',
    type: 'get',
    response: config => {
      
      return {
        code: 20000,
        data:data,
        
      }
    }
  }
]
