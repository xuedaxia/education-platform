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
    url: '/course/uploadSourse',
    type: 'post',
    response: config => {
      
      return {
        code: 20000,
        data: {
          
        }
      }
    }
  }
]
