import Vue from 'vue'
import { apis } from '@/projects'

Vue.prototype.$apis = {
    /** 通用接口-登录 */
    // login: (params) => dlRequest.put('/login', params),
    /**通用接口-上传文件 */
    // uploadFile(){
    //     return '/upload/uploadFile/'
    // },
    /** 项目接口 */
    ...apis
}