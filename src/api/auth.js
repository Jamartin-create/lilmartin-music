import request from '@/util/requets'

//获取二维码key值
export const getQrCodeKey = () => {
    return request({
        method: 'get',
        url: '/login/qr/key',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//根据二维码key值生成二维码base64
export const getQrCode = (params) => {
    return request({
        method: 'get',
        url: '/login/qr/create',
        params: {
            params,
            timestamp: new Date().getTime(),
        }
    })
}

//检验二维码状态
/**
 * 
 * @param {String} key 二维码的key
 * @returns 
 * 800：二维码过期
 * 801：等待扫码
 * 802：等待确认
 * 803：登陆成功，并返回cookies
 */
export const checkQrCodeStatus = (key) => {
    return request({
        method: 'get',
        url: '/login/qr/check',
        params: {
            key,
            timestamp: new Date().getTime(),
        }
    })
}