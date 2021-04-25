const cookieParser = require('cookie-parser');
const getCookie = function (req) {
  if (req && req.headers && req.headers.cookie) {
    const parsed = cookieParser(req.headers.cookie)
    return parsed
  } else {
    return {auth: null, lang: null}
  }
}
export default getCookie