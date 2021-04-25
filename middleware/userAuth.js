
import utils from '~/plugins/utils'
export default function ({route, req, res, redirect}) {
  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/';
  var token, path
  //在服务端
  if (isServer) {
    let cookies = utils.getcookiesInServer(req)
    path = req.originalUrl;
    token = cookies.token ? cookies.token : ''
    console.log('非客户端')
  }
  //在客户端判读是否需要登陆
  if (isClient) {
    token = utils.getcookiesInClient('token')
    path = route.path;
  }
  if (path) {
    // redirectURL = '/login?ref=' + encodeURIComponent(path)
    redirectURL = '/'+route.params.lang+'/login'
  }
  //需要进行权限判断的页面开头
  if (!token) {
      // console.log('_______',token)
       redirect(redirectURL)
  }
}