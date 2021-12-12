import {asyncRoutes, constantRoutes, devRoutes} from '@/router'
import {getAuth} from "@/api/sys/user";
import {treeDataTranslate} from "@/utils";
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {...route}
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  permission: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_PERMISSIONS: (state, permission) => {
    state.permission = permission
  }
}

// const actions = {
//   generateRoutes({ commit }, roles) {
//     return new Promise(resolve => {
//       let accessedRoutes
//       if (roles.includes('admin')) {
//         accessedRoutes = asyncRoutes || []
//       } else {
//         accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
//       }
//       commit('SET_ROUTES', accessedRoutes)
//       resolve(accessedRoutes)
//     })
//   }
// }

const actions = {
  generateRoutes({commit}) {
    return new Promise(resolve => {
      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      getAuth().then(response => {
        let data = response.data
        //保存权限
        let arr = []
        data.forEach(e => {
          if (e != null && e.menuPerms != null) {
            const perms = e.menuPerms.split(',')
            for (let i = 0; i < perms.length; i++) arr.push(perms[i])
          }
        })
        commit('SET_PERMISSIONS', arr)
        //保存菜单
        let menus = data.filter(menu => menu.menuType == 0 || menu.menuType == 1)
        let tree = treeDataTranslate(menus, 'uuid')
        //开发环境展示
        if (process.env.NODE_ENV === "development") {
          let accessedRoutes = [].concat(devRoutes)
          generaMenu(accessedRoutes, tree)
          accessedRoutes.sort(function (a, b) {return a.menuOrder - b.menuOrder})
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        } else {
          let accessedRoutes = [].concat(asyncRoutes)
          generaMenu(accessedRoutes, tree)
          accessedRoutes.sort(function (a, b) {return a.menuOrder - b.menuOrder})
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }
      }).catch(error => {
        console.error(error)
      })
    })
  }
}

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    let menu = {
      // path必须/开通不然会显示空白
      path: '/' + item.menuUrl + item.id,
      component: item.menuType === 0 ? Layout : (resolve) => require([`@/views/${item.menuUrl}/index`], resolve),
      children: [],
      name: 'menu_' + item.id,
      menuOrder: item.menuOrder,
      meta: {title: item.menuName, icon: item.menuIcon}
    }
    if (item.children) {
      item.children.sort(function (a, b) {
        return a.menuOrder - b.menuOrder
      })
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
