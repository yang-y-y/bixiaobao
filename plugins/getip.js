
export default async ({ req, error, $winstonLog }) => {
    let ip=''
    if (process.server) {
        const geoip = require('geoip-lite');
        // x-real-ip 通过nginx配置添加
         ip =req.headers['bigo-x-client-source-ip'] ||
          req.headers['x-real-ip'] ||
          req.connection.remoteAddress;
          
          let  geo = geoip.lookup(ip);
          if(geo){
            console.log(geo.city,'1111')
           
          }

          // 对ip做业务处理
      }
  };