const Mock = require('mockjs')

const data = Mock.mock({
  
    courseInfoVo: {
        name:"hahaha",
        subjectParentId:12345,
        subjectId:123451,
        overview:"111",
        
    },

})

module.exports = [
  {
    url: '/teacher/getCourseInfo',
    type: 'get',
    response: config => {
      
      return {
        code: 20000,
        data:data,
        
      }
    }
  }
]
