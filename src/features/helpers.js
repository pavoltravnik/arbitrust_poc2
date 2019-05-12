export function bufferText(str){
  return new TextEncoder("utf-8").encode(str)
}

export function sha256(buffer) {
    return crypto.subtle.digest("SHA-256", buffer).then(function(hash) {
      return hex(hash);
    })
}

function hex(buffer) {
    var digest = ''
    var view = new DataView(buffer)
    for(var i = 0; i < view.byteLength; i += 4) {
      // We use getUint32 to reduce the number of iterations (notice the `i += 4`)
      var value = view.getUint32(i)
      // toString(16) will transform the integer into the corresponding hex string
      // but will remove any initial "0"
      var stringValue = value.toString(16)
      // One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
      // chars for Uint16 and 2 chars for Uint8)
      var padding = '00000000'
      var paddedValue = (padding + stringValue).slice(-padding.length)
      digest += paddedValue
    }
    return digest;
}

export function arrayBufferToBase64String(arrayBuffer) {
  var byteArray = new Uint8Array(arrayBuffer)
  var byteString = ''
  for (var i=0; i<byteArray.byteLength; i++) {
    byteString += String.fromCharCode(byteArray[i])
  }
  return btoa(byteString)
}

export function base64StringToArrayBuffer(b64str) {
  var byteStr = atob(b64str)
  var bytes = new Uint8Array(byteStr.length)
  for (var i = 0; i < byteStr.length; i++) {
    bytes[i] = byteStr.charCodeAt(i)
  }
  return bytes.buffer
}

