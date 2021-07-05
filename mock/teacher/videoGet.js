const Mock = require('mockjs')

const data = Mock.mock({
  chapter:{

  }
   
})

module.exports = [
  {
    url: '/video/getVideoInfo',
    type: 'get',
    response: config => {
      
      return {
        code: 20000,
        data:{
            video:{
                id:"123451",
                title:"vue",
              
            }
        },
        
      }
    }
  }
]
