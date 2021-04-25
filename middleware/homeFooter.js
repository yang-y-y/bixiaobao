export default function ({ route,app}) {
  console.log(route,'这是首页底部中间件')
  app.$cookies.set('homeRoute',route.path)
}