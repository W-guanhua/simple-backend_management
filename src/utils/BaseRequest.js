/** 通用请求
 * 1. 统一get请求和post请求的入参方式
 * 2. 解析url中 {key} 内容，自动拼接url
 * 3. 添加loading机制，只要有请求正在请进行中，则会处于loading状态
 * 4. 支持设置公共请求参数：request['setCommonParams']
 * 5. 统一错误处理（待定）
 * 6. 统一返回格式（待定）
 */
import _axios from 'axios'
import {
    showLoading,
    hideLoading
} from './loading';
import Message from './message'
// request[method:请求方法]({
//     ...params, // 请求参数
//     _options: {}, // 配置参数
// }, (err) => false // 异常回调，如果该回调放回内容转化为布尔值后为true，则整个请求返回resolve状态，否则为pendding
// }):Promise<resolve|pending>
export default class BaseRequest {
    request = null
    commonParams = {} // 公共参数
    useToken = false // 是否带上token
    usePostParams = false // post请求是否把参数拼接在url后面
    useTimestamp = false // 请求是否带上时间戳
    defaultOptions = {
      timeout: 10000 * 1
    }
    constructor ({
      usePostParams,
      useToken,
      options,
      interceptors
    }) {
      const baseRequest = _axios.create(Object.assign(this.defaultOptions, options))
      this.useToken = useToken
      this.usePostParams = usePostParams
      // 请求拦截
      const [request, requestError] = interceptors.request
      const [responseHandler, responseError] = interceptors.response
      baseRequest.interceptors.request.use(
        (config) => request(this._request(config), this),
        (error) => requestError(this._requestError(error), this)
      )
      // 响应拦截
      baseRequest.interceptors.response.use(
        (response) => responseHandler(this._response(response), this),
        (error) => responseError(this._responseError(error), this)
      )

      /** 添加请求体的一些自定义方法 */
      // 获取初始化参数
      baseRequest['getOptions'] = () => options
      // 设置请求公共参数
      baseRequest['setCommonParams'] = (params) => {
        this.commonParams = Object.assign(null, this.commonParams, params)
      }
      // 设置token
      baseRequest['setToken'] = (token) => {
        sessionStorage.setItem('token', token)
      }
      // 获取token
      baseRequest['getToken'] = () => {
        return sessionStorage.getItem('token') || ''
      }
      this.request = baseRequest
      this._requestWrapper(this.request, ['get', 'post', 'put', 'delete']) // 赋能
      return this.request
    }
    /** 内置拦截器 */
    _request (config) {
      showLoading()
      this._preFilter(config, this)
        ._headersFilter(config, this)
        ._paramsFilter(config, this)
        ._urlFilter(config, this)

      return config
    }

    _requestError (error) {
      hideLoading()
      return error
    }

    _response (response) {
      hideLoading()
      return response
    }

    _responseError (error) {
      hideLoading()
      const isTimeout = error.toString().indexOf('timeout') !== -1
      if (isTimeout) {
        // 超时处理
        Message.error('网络超时，请稍后重试')
        return {
          response: {
            data: '网络超时'
          }
        }
      }
      return error
    }
    _deepClone (target) {
      return JSON.parse(JSON.stringify(target))
    }
    _hasObjectKey (obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key)
    }
    _getPayload (config) {
      const method = config.method.toLowerCase()
      if (method === 'post' || method === 'put') { // post/put 请求url带上sign，并带上公共参数
        return this._deepClone(config.data || {})
      } else if (method === 'get' || method === 'delete') {
        return this._deepClone(config.params || {})
      }
    }
    /**
     *
     * @param {*} params
     * @param {*} pre true：公共参数插在入参之前，false，插在入参之后，会覆盖入参
     */
    _setPayload (config, params, pre = false) {
      const method = config.method.toLowerCase()
      if (method === 'post' || method === 'put') { // post/put 请求url带上sign，并带上公共参数
        pre ? config.data = Object.assign({}, params, config.data)
          : config.data = Object.assign({}, config.data, params)
      } else if (method === 'get' || method === 'delete') {
        pre ? config.params = Object.assign({}, params, config.params)
          : config.params = Object.assign({}, config.params, params)
      }
      return config
    }
    _deletePayload (config, key) {
      const method = config.method.toLowerCase()
      if (method === 'post' || method === 'put') { // post/put 请求url带上sign，并带上公共参数
        if (this._hasObjectKey(config.data, key)) {
          delete config.data[key]
        }
      } else if (method === 'get' || method === 'delete') {
        if (this._hasObjectKey(config.params, key)) {
          delete config.params[key]
        }
      }
    }
    _requestWrapper (request, methodList) {
      const wrapper = (axiosRequest, method) => {
        return (url, params, onError) => {
          return axiosRequest(url, this._paramsWrapper(method, params))
            .then(res => res)
            .catch(async (error) => {
              if (onError && (typeof onError === 'function')) {
                const returnResolve = await onError(error)
                if (returnResolve) return returnResolve
              }
              return new Promise(resolve => {})
            })
        }
      }
      methodList.forEach(method => {
        request[method] = wrapper(this.request[method], method)
      })
    }
    _paramsWrapper (method, params) {
      if (['get'].includes(method) && params && !Object.prototype.hasOwnProperty.call(params, 'params')) {
        return {
          params
        }
      }
      return params
    }
    _handleOptions (config, options) {
      Object.entries(options).forEach(([key, value]) => {
        switch (key) {
          case '$headers':
            config.headers.common = Object.assign({}, config.headers.common, value)
            config.headers = Object.assign({}, config.headers, value)
            break
          default:
            break
        }
      })
    }
    /** 前置过滤器，必须放在最前面 */
    _preFilter (config, ctx) {
      // 处理配置类型的参数：$开头
      const params = this._getPayload(config)
      const options = Object.keys(params).reduce((obj, key) => {
        if (/^\$/.test(key)) {
          obj[key] = this._deepClone(params[key])
          this._deletePayload(config, key)
        }
        return obj
      }, {})
      this._handleOptions(config, options)
      return ctx
    }
    /** 预处理入参 */
    _paramsFilter (config, ctx) {
      // post请求把参数拼接在url后面
      if (this.usePostParams) {
        if (config.method === 'post') {
          config.params = config.data
        }
      }
      if (this.useTimestamp) {
        this._setPayload(config, {timestamp: Date.now()}, true)
      }
      // 设置公共参数
      this._setPayload(config, ctx.commonParams, true)
      return ctx
    }
    _urlFilter (config, ctx) {
      const params = this._getPayload(config)
      config.url = Object.keys(params).reduce((handleUrl, key) => {
        let reg = new RegExp(`{${key}}`)
        handleUrl = handleUrl.replace(reg, params[key])
        return handleUrl
      }, config.url)
      return ctx
    }
    _headersFilter (config, ctx) {
      // 处理请求token
      if (ctx.useToken) {
        config.headers.common.token = ctx.request.getToken()
      }
      return ctx
    }
}
