
// 百度统计
export default ({ app: { router }, store }) => {
    /* 每次路由变更时进行pv统计 */
    router.afterEach((to, from) => {
        /* 告诉增加一个PV */
        try {
            if(!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "67e5fe9bed9938";
            if(window.wcs) {
            wcs_do();
            }
        } catch (e) {}
    })
}