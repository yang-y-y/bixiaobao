

import request from '@/plugins/service' 

export const tickerList = () =>{ 
    return request({ url: '/api/public/v1/ticker', method: 'get'}) 
}
