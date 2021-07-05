import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import { resolve } from 'core-js/fn/promise'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    //menus:'',//新增
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar  
  },

  //新增
  // SET_MENUS:(state,menus) => {
  //   state.menus=menus
  // }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password,role } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password ,role:role} ).then(response => {
        //const { data } = response
        window.sessionStorage.setItem("token",response.token)
        if(role=="teacher") {
          commit('SET_TOKEN', 'teacher-token')  //判断教师和学生的身份
          setToken('teacher-token')
          resolve()
        }
        else {
          commit('SET_TOKEN', 'student-token')  //判断教师和学生的身份
          setToken('student-token')
          resolve()
        }
        
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit}) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        // commit('SET_MENUS', menus)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // getnav({commit,state}){
  //   return new Promise((resolve,reject)=>{
  //     getdh().then(response=>{
  //       const menus=response.data
  //       menus.push({
  //         path:'/404',
  //         component:'404',
  //         hidden:true
  //       },{
  //         path:'*',
  //         redirect:'/404',
  //         hidden:true
  //       })
  //       commit('SET_MENU',menus)
  //       resolve()
  //     }).catch(error=>{
  //       reject(error)
  //     })
  //   })
  // },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

