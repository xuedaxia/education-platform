
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
    url: '/subject/getAllSubject',
    type: 'get',
    response: config => {
      
      return {
        code: 20000,
        data: {
          list:[
              {
                  id:"12345",
                  title:"前端开发",
                  children:[
                      {
                          id:"123451",
                          title:"vue"
                      },
                      {
                        id:"123452",
                        title:"javascript"
                    },
                    {
                        id:"123453",
                        title:"jquery"
                    }
                  ]
              },
              {
                id:"12346",
                title:"后端开发",
                children:[
                    {
                        id:"123461",
                        title:"java"
                    },
                    {
                      id:"123462",
                      title:"c++"
                  },
                  
                ]
            },
            {
                id:"12347",
                title:"数据库开发",
                children:[
                    {
                        id:"123471",
                        title:"mysql"
                    }
                ]
            },
          ]

          
        }
      }
    }
  }
]
