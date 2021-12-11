import store from '@/store'

// function checkPermission(el, binding) {
//   const { value } = binding
//   const roles = store.getters && store.getters.roles
//
//   if (value && value instanceof Array) {
//     if (value.length > 0) {
//       const permissionRoles = value
//
//       const hasPermission = roles.some(role => {
//         return permissionRoles.includes(role)
//       })
//
//       if (!hasPermission) {
//         el.parentNode && el.parentNode.removeChild(el)
//       }
//     }
//   } else {
//     throw new Error(`need roles! Like v-permission="['admin','editor']"`)
//   }
// }
function checkPermission(el, binding) {
  const { value } = binding
  const all_permission = '*:*:*'
  const permissions = store.getters && store.getters.permission
  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value
      const hasPermission = permissions.some(permission => {
        return all_permission === permission || permissionRoles.includes(permission)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need permission!`)
  }
}
export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
