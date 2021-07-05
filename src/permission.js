import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import Layout from '@/layout'

// const _import=require('./router/_import_'+process.env.NODE_ENV)
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()
  const hasToken = window.sessionStorage.getItem("token")

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      // const hasGetUserInfo = store.getters.name
      
      if (hasGetUserInfo) {
       
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          if(store.getters.token==='teacher-token'){
            let routes=[
             
             {
      path: '/course',
     component: Layout,
     redirect: '/course/list',
     name: '课程管理',
     meta: { title: '课程管理', icon: 'example' },
     children: [
       {
         path: 'list',
         name: '课程列表',
         component: () => import('@/views/edu/course/list'),
         meta: { title: '课程列表', icon: 'table' }
       },
       {
         path: 'info',
         name: '添加课程',
         component: () => import('@/views/edu/course/info'),
         meta: { title: '添加课程', icon: 'tree' }
       },
       {
         path: 'info/:id',
         name: '添加课程',
         component: () => import('@/views/edu/course/info'),
         meta: { title: '编辑课程基本信息', noCache:true},
         hidden:true
       },
       
       {
         path: 'publish/:id',
         name: '添加课程',
         component: () => import('@/views/edu/course/publish'),
         meta: { title: '发布课程', noCache:true},
         hidden:true
       },
       {
         path: 'save/:id',
         name: '上传资源',
         component: () => import('@/views/edu/subject/save'),
         meta: { title: '上传文件', icon: 'tree' },
         hidden:true
       },
       {
         path: 'detail/:id',//id是占位符
         name: '课程详情',
         component: () => import('@/views/edu/course/detail'),
         meta: { title: '课程详情', noCache: 'true' },
         hidden:true
       },
 
     ]
   },
   {
     path: '/mycourse',
     component: Layout,
     name: '我的课程',
     children: [
       {
         path: 'publishCourse',
         name: '我的课程',
         component: () => import('@/views/edu/teacher/mycourse'),
         meta: { title: '我的课程', icon: 'link' }
       }
     ]
   },
             {
               path: '/profile',
               component: Layout,
               name: '个人简介',
               children: [{
                 path: 'information',
                 name: '个人简介',
                 component: () => import('@/views/edu/teacher/profile'),
                 meta: { title: '个人简介', icon: 'tree' }
               }]
               
             },
             ]
             router.addRoutes(routes)
             router.options.routes=[...routes];
             console.log(router.options.routes);
           }
         
          if(store.getters.token==='student-token'){
            let routes=[          
              {
                path: '/course',
                component: Layout,
                redirect: '/course/information',
                name: '课程列表',
                children: [{
                  path: 'information',
                  name: '',
                  component: () => import('@/views/edu/student/subject'),
                  meta: { title: '课程信息', icon: 'dashboard' }
                },
                {
                  path: 'detail/:id',//id是占位符
                  name: '',
                  component: () => import('@/views/edu/course/detail'),
                  meta: { title: '课程详情', noCache: 'true' },
                  hidden:true
                },
               
              ]               
              },
              
              {
                path: '/profile',
                component: Layout,
                name: '个人简介',
                children: [{
                  path: 'information',
                  name: '',
                  component: () => import('@/views/edu/student/profile'),
                  meta: { title: '个人简介', icon: 'tree' }
                },

                ]
                
              },
              
                {
                  path: '/mycourse',
                  component: Layout,
                  name: '我的课程',
                  children: [
                    {
                      path: 'joinCourse',
                      name: '已加入的课程',
                      component: () => import('@/views/edu/student/mycourse'),
                      meta: { title: '我的课程', icon: 'link' }
                    }
                  ]
                },
            //  // 404 page must be placed at the end !!!
            //  { path: '*', redirect: '/404', hidden: true }
            ]
            router.addRoutes(routes)
            router.options.routes=[...routes];
            console.log(router.options.routes);

          }
          if (to.matched.length ===0) next({path: to.path})
             else next()
          // next()
        } catch (error) {
          console.log(error);
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error('Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

