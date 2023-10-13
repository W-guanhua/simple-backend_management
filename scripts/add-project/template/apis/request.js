import BaseRequest from '@/utils/BaseRequest'
import config from '../project.config'

const request = new BaseRequest({
    options: {
        baseURL: config.baseURL
    },
    interceptors: {
        request: [
            (config) => {
                return config
            },
            (error) => {
                return Promise.resolve([null, error])
            }
        ],
        response: [
            (response) => {
                if (response.data.errCode === 'e0000') {
                    return Promise.resolve([response.data.body, null])
                } else {
                    return Promise.resolve([null, response.data.errMessage || response.data])
                }
            },
            (error) => {
                const res = JSON.parse(JSON.stringify(error))
                return Promise.resolve([null, res])
            }
        ]
    }
})
export default request
