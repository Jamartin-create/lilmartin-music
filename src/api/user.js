import request from '@/util/requets'

// 获取账户信息
export const getUserAccount = () => {
    return request({
        method: 'get',
        url: '/user/account',
        params: {
            timestamp: new Date().getTime()
        }
    })
}

/**
 * 获取歌单列表
 * @param {Object} params 
 * @param {Number} params.uid
 * @param {Number} params.limit
 * @returns 
 */
export const getUserPlayList = (params) => {
    return request({
        method: 'get',
        url: '/user/playlist',
        params: {
            ...params,
            timestamp: new Date().getTime()
        }
    })
}

// 退出登录
export const logout = () => {
    return request({
        method: 'get',
        url: '/logout',
        params: {
            timestamp: new Date().getTime()
        }
    })
}
