import axios from 'axios'
import md5 from 'js-md5'

let vueH5 = {
  taskAxios: (para, callback, error) => {
    let timestamp = Date.parse(new Date()) / 1000
    let token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/' + para['url'] + '@3ad3ebb04b5c94cd234e16a6aef9c8ae')
    axios({
      method: para['method'] || 'get',
      url: 'urlApi/app/v1/' + para['url'], // urlApi=http://wawa.fm
      params: Object.assign(para['data'] || {}, {
        api_key: '0fcf845a413e11beb5606448eb8abbc4',
        timestamp: timestamp
      }),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'wawa ' + token
      }
    }).then(callback).catch(error)
  },
  taskAxiosForm: (para, callback, error) => {
    let timestamp = Date.parse(new Date()) / 1000
    let token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/' + para['url'] + '@3ad3ebb04b5c94cd234e16a6aef9c8ae')
    axios({
      method: para['method'] || 'get',
      url: 'urlApi/app/v1/' + para['url'],
      data: Object.assign(para['data'] || {}, {
        api_key: '0fcf845a413e11beb5606448eb8abbc4',
        timestamp: timestamp
      }),
      transformRequest: [
        function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }
      ],
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'wawa ' + token
      }
    }).then(callback).catch(error)
  }
}

/* 生成电脑随机的GUID */
let getGuid = function getGuid () {
  let data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let j = 0
  let k = 0
  let res1 = ''
  let res2 = ''
  for (var i = 0; i < 10; i++) {
    j = Math.floor(Math.random() * 36)
    k = Math.floor(Math.random() * 36)
    res1 += data[j]
    res2 += data[k]
  }
  return res1 + new Date().getTime() + res2
}
export {
  vueH5, getGuid
}
