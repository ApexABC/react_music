import ZQRequest from './request'
// 区分开发和成产环境
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://codercba.com:9002'
} else {
  BASE_URL = 'http://codercba.com:9002'
}
const TIME_OUT = 5000
const zqRequest = new ZQRequest(BASE_URL, TIME_OUT)
export default zqRequest
