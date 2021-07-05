const Mock = require('mockjs')

const data = Mock.mock({
  chapter:{

  }
   
})

module.exports = [
  {
    url: '/chapter/getChapterInfo',
    type: 'get',
    response: config => {
      
      return {
        code: 20000,
        data:{
            chapter:{
                id:"12345",
                title:"第一章 Java入门",
                sort:1
            }
        },
        
      }
    }
  }
]
