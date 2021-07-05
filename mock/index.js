const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const teacher = require('./teacher/teacher')
const user = require('./user')
const table = require('./table')
const teacherAdd=require('./teacher/teacherAdd')
const teacherInfoGet=require('./teacher/teacherInfoGet')
const teacherUpdate=require('./teacher/teacherUpdate')
const avater=require('./teacher/avater')
const subjectAdd=require('./teacher/subjectAdd')
const subjectListGet=require('./teacher/subjectListGet')
const courseInfoAdd=require('./teacher/courseInfoAdd')
const findAll = require('./teacher/findAll')
const allChapterVideoGet=require('./teacher/allChapterVideoGet')
const courseInfoIdGet=require('./teacher/courseInfoIdGet')
const courseInfoUpdate=require('./teacher/courseInfoUpdate')
const chapterAdd=require('./teacher/chapterAdd')
const chapterGet=require('./teacher/chapterGet')
const chapterUpdate=require('./teacher/chapterUpdate')
const chapterDelete=require('./teacher/chapteDelete')
const videoAdd = require('./teacher/videoAdd')
const videoUpdate = require('./teacher/videoUpdate')
const videoGet = require('./teacher/videoGet')
const videoDelete = require('./teacher/videoDelete')
const publishCourseInfoGet = require('./teacher/publishCourseInfoGet')
const coursePublish = require('./teacher/coursePublish')
const listCourseGet = require('./teacher/listCourseGet')
const sourseAdd=require('./teacher/sourseAdd')
const courseDelete=require('./teacher/courseDelete')

const mocks = [
  
  ...user,
  ...table,
  ...teacher,
  ...teacherAdd,
  ...teacherInfoGet,
  ...teacherUpdate,
  ...avater,
  ...subjectAdd,
  ...subjectListGet,
  ...courseInfoAdd,
  ...courseInfoUpdate,
  ...findAll,
  ...allChapterVideoGet,
  ...courseInfoIdGet,
  ...chapterAdd,
  ...chapterGet,
  ...chapterUpdate,
  ...chapterDelete,
  ...videoAdd,
  ...videoUpdate,
  ...videoGet,
  ...videoDelete,
  ...publishCourseInfoGet,
  ...coursePublish,
  ...listCourseGet,
  ...sourseAdd,
  ...courseDelete
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}

