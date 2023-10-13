import request from './request'

export default {
    request,
    /*----------------------------------------中台接口-------------------------------------------*/
    /** 活动-中台管理 */
    getActivityList: (params) => request.get(`/bbs/activity/manage/v1`, { params }), // 分页获取活动列表
}