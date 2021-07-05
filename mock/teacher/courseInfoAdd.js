const Mock = require('mockjs')

const data = Mock.mock({
  
    'courseId|+1': 0,

})

module.exports = [
  {
    url: '/course/addCourseInfo',
    type: 'post',
    response: config => {
      
      return {
        code: 20000,
        data:data,
        
      }
    }
  }
]
