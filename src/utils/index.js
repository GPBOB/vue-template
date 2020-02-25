export const dataURItoBlob = function(dataURI) {
  const byteString = atob(dataURI.split(',')[1])
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeString })
}

export const isPC = function() {
  const ua = navigator.userAgent.toLowerCase()
  // const isIpad = ua.match(/ipad/i) === 'ipad'
  // const isIphoneOs = ua.match(/iphone os/i) === 'iphone os'
  // const isMidp = ua.match(/midp/i) === 'midp'
  // const isUc7 = ua.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4'
  // const isUc = ua.match(/ucweb/i) === 'ucweb'
  // const isAndroid = ua.match(/android/i) === 'android'
  // const isCE = ua.match(/windows ce/i) === 'windows ce'
  // const isWM = ua.match(/windows mobile/i) === 'windows mobile'
  // const isWeibo = ua.match(/weibo/i) === 'weibo'
  // const isQQ = ua.indexOf('qq/') != -1
  // const isWx = ua.match(/MicroMessenger/i) === 'micromessenger'
  // if (
  //   isIpad ||
  //   isIphoneOs ||
  //   isMidp ||
  //   isUc7 ||
  //   isUc ||
  //   isAndroid ||
  //   isCE ||
  //   isWM
  // ) {
  //   alert('当前是Mobile手机登录')
  // } else {
  //   alert('当前是PC电脑登录')
  // }
  const isMobile = /mobile/gi.test(ua)
  if (isMobile) {
    return false
  } else {
    return true
  }
}
