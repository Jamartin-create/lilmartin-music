/**
 * vuex：user模块
 */
import { isLoging, isAccountLogin } from '@/util/auth'
import { getUserAccount, getUserPlayList } from '@/api/user'
import updataApp from '@/util/updataApp'
import mylocalStorage from './userInitLocalStorage'

if (localStorage.getItem('data') === null) {
    localStorage.setItem('data', JSON.stringify(mylocalStorage.data))
}

//刷新localstorage
updataApp()

const state = {
    data: JSON.parse(localStorage.getItem('data')) ?? {},
    playLists: [],  //歌单列表
}

const getters = {}

const actions = {
    /**
     * 获取用户信息
     * @param {Object} context store上下文对象
     * @returns 
     */
    async fetchUserAccount({ commit }) {
        if (!isLoging()) return
        const result = await getUserAccount()
        if (result.code === 200) {
            commit('UPDATE_USER_PROFILE', result.profile)
        }
    },
    /**
     * 获取用户的歌单
     * @param {Object} context
     * @returns 
     */
    async fetchUserPlayList({ commit, state }) {
        if (!isAccountLogin()) return
        if (isAccountLogin()) {
            return getUserPlayList({
                uid: state.data.profile.userId,
                limit: 2000,
            }).then(res => {
                if (res.playlist) {
                    commit('UPDATE_USER_PLAY_LIST', res.playlist)
                    commit('UPDATE_USER_LIKE_PLAY_LIST_ID', res.playlist[0].id)
                }
            })
        }
    }
}

const mutations = {
    //更新账户信息
    UPDATE_USER_PROFILE(state, data) {
        state.data.profile = data
    },
    //更新登录模式（账户登录或其他）
    UPDATE_USER_LOGIN_MODE(state, data) {
        state.data.loginMode = data
    },
    //更新歌单
    UPDATE_USER_PLAY_LIST(state, data) {
        state.playLists = data
    },
    //更新我喜欢的音乐歌单id
    UPDATE_USER_LIKE_PLAY_LIST_ID(state, data) {
        state.data.likeSongPlayListId = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}