import request from './request'

export default {
    request,
    
    // 中台登录获取token
    midLogin: (params) => request.post(`/template/midLogin`, params),
}