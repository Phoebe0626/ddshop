import request from '../utils/request'

export const getCode = function (phoneNumber) {
  return request({
    url: 'send_code',
    query: {
      phoneNumber
    }
  })
}

export const login = function (phone, captcha) {
  return request({
    url: 'login_code',
    method: 'POST',
    data: {
      phone,
      captcha
    }
  })
}
