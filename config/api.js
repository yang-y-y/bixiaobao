/**
 * API 数据总操作类
 *
 */

/**
 * 用户模块
 */
import {get,post} from './http.js'
export default {
    //平台综合排行榜
    tickerList(params) {
        return get('public/v1/ticker', params)
    },
    //交易所币对列表
    coinList(params){
        return get('/api/exchange/houbi/token/list/type/', params)
    },
    coinList(params){
        return get('/api/exchange/houbi/token/list/type/', params)
    }



}
