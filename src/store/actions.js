const actions = {

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },

  setAuth({ commit }, data) {
    commit('SET_AUTH', data)
   
  },

  setTableCoulmnField({ commit }, data) {
    commit('SET_TABLE_COLUMN', data)
   
  },

  purgeAuth({ commit }) {
    commit('PURGE_AUTH')
  },

  getGender({ commit }) {
    commit('GET_GENDER')
  },
  
  getOccupation({ commit }) {
    commit('GET_OCCUPATION')
  },

  updateProfile({ commit }, data) {
    commit('SET_UPDATE_PROFILE', data)
  },
}

export default actions
