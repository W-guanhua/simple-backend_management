import { configs } from '@/projects'

export default {
    title: '管理后台',
    /** 是否需要跳过登录验证
     * true: 登录页不会进行账号密码校验，也不会调登录接口，一般是调试用
     */
    IGNORE_AUTH_CHECK: true,
    /** 项目配置 */
    ...configs,
}