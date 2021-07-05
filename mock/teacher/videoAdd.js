const Mock = require('mockjs')

const data = Mock.mock({
  
    'courseId|+1': 0,

})

module.exports = [
  {
    url: '/video/addVideo',
    type: 'post',
    response: config => {
      
      return {
        code: 20000,
        
        
      }
    }
  }
]
