const Mock = require('mockjs')

const data = Mock.mock({
  'rows|10': [{
    'id|+1': 0,
    viewCount: '@integer(300, 5000)',
    'status|1': ['Normal', 'Draft'],
    name: '@sentence(1, 3)',
    Create_time: '@datetime',
    lessonNum: '@integer(0, 100)',
  },
]
})

module.exports = [
  {
    url: '/course',
    type: 'get',
    response: config => {
      const list = data.rows
      return {
        code: 20000,
        data: {
          total:16,
          list: list,
        }
      }
    }
  }
]
