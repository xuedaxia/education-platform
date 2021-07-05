const Mock = require('mockjs')

const data = Mock.mock({
  
    'courseId|+1': 0,

})

module.exports = [
  {
    url: '/chapter/addChapter',
    type: 'post',
    response: config => {
      
      return {
        code: 20000,
        data:data,
        
      }
    }
  }
]
