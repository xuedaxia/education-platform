const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    'id|+1': 0,
    name: '@sentence(1, 3)',
  },
]
})

module.exports = [
  {
    url: '/teacher/findAll',
    type: 'get',
    response: config => {
      
      return {
        code: 20000,
        data:data
      }
    }
  }
]

     