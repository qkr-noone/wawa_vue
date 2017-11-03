// let baseUrl = 'http://localhost/...'
// let imguUrl = 'http://localhost/...'

import axios from 'axios'
import md5 from 'js-md5'

const timestamp = Date.parse(new Date()) / 1000
let API
const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=' + API + '@3ad3ebb04b5c94cd234e16a6aef9c8ae')

let AxiosG = axios.create({
  baseUrl: 'http://wawa.fm',
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
  headers: {'Authorization': 'wawa ' + token}
})

let AxiosP = axios.create({
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
})

if (process.env.NODE_ENV === 'development') {

} else if (process.env.NODE_ENV === 'production') {

}

export {
  AxiosG, AxiosP, API, timestamp, token
}
