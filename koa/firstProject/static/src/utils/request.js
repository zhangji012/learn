import 'watch-fetch'

function fetchEvent(options) {
  if (!options) {
    return
  }
  let _url = options.url || ''
  let _type = options.type || 'GET'
  let _data = options.data || {}
  let _sucess
  let _error
  let fetchParams = {
    credentials: 'include',
  }

  if (_type === 'GET') {
    let urlParams = []
    for (let key in _data) {
      let _paramStr = ''
      if (typeof _data[key] === 'object') {
        _paramStr = `${key}=${JSON.stringify(_data[key])}`
      } else {
        _paramStr = `${key}=${_data[key]}`
      }
      urlParams.push(_paramStr)
    }

    if (_url.indexOf('?') >= 0) {
      _url = `${_url}&${urlParams.join('&')}`
    } else {
      _url = `${_url}?${urlParams.join('&')}`
    }
    fetchParams = {
      ...fetchParams,
      ...{
        header: new Headers()
      }
    }
  } else {
    fetchParams = {
      credentials: 'include',
      method:_type,
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(_data)
    }
    fetchParams = {
      ...fetchParams,
      ...{
        method: _type,
        header: {'Content-type': 'application/json'},
        body: JSON.stringify(_data)
      }
    }
  }

  if (typeof options.success === 'function' && typeof options.error === 'function') {
    _sucess = options.success
    _error = options.error
    window.fetch(_url, fetchParams) {

    }
  }



}