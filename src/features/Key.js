import React from 'react';

function arrayBufferToBase64String(arrayBuffer) {
  var byteArray = new Uint8Array(arrayBuffer)
  var byteString = ''
  for (var i=0; i<byteArray.byteLength; i++) {
    byteString += String.fromCharCode(byteArray[i])
  }
  return btoa(byteString)
}

export class Key extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          key: '',
        };
        this.generateKey = this.generateKey.bind(this);

    }

    async generateKey(){
      const keyPair = await crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );
      const result = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
      // console.log(arrayBufferToBase64String(result));
      return;

    }

    render() {
      return (
        <div>
          <h1>Generate RSA</h1>
          <button onClick={this.generateKey}> Generate Key </button>
        </div>
      );
    }
}