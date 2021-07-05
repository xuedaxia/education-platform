
const Mock = require('mockjs')

const data = Mock.mock({
  'rows|10': [{
    'id|+1': 0,
    major: '@sentence(3, 5)',
    'status|1': ['published', 'draft', 'deleted'],
    name: '@sentence(1, 3)',
    Create_time: '@datetime',
    email: '@integer(300, 5000)',
  },
]
})

module.exports = [
  {
    url: '/chapter/getChapterVideo',
    type: 'get',
    response: config => {
      
      return {
        code: 20000,
        data: {
            allChapterVideo:[
              {
                  id:"101",
                  title:"第一章：java入门",
                  children:[
                      {
                          id:"1011",
                          title:"vue"
                      },
                      {
                        id:"1012",
                        title:"javascript"
                    },
                    {
                        id:"1013",
                        title:"jquery"
                    }
                  ]
              },
              {
                id:"102",
                title:"第二章：数据类型",
                children:[
                    {
                        id:"1021",
                        title:"java"
                    },
                    {
                      id:"1022",
                      title:"c++"
                  },
                  
                ]
            },
            {
                id:"103",
                title:"第三章：I/O流",
                children:[
                    {
                        id:"1031",
                        title:"mysql"
                    }
                ]
            }
          ]

          
        }
      }
    }
  }
]
