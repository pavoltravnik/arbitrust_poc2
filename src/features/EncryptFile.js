import React from 'react';
import { arrayBufferToBase64String, base64StringToArrayBuffer } from './helpers'

export class EncryptFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          key: '',
        };
        this.addToIPFS = this.addToIPFS.bind(this);

    }

    async addToIPFS(){

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
        const publicKey = await crypto.subtle.exportKey('spki', keyPair.publicKey);
        const privateKey = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

        console.log(arrayBufferToBase64String(publicKey));
        console.log(arrayBufferToBase64String(privateKey));
        console.log(typeof publicKey);
        console.log(publicKey);

        const importedPublicKey = await window.crypto.subtle.importKey(
          "spki",
          publicKey,
          {
            name: "RSA-OAEP",
            hash: "SHA-256"
          },
          true,
          ["encrypt"]
        );

        const importedPrivateKey = await window.crypto.subtle.importKey(
          "pkcs8",
          privateKey,
          {
            name: "RSA-OAEP",
            // Consider using a 4096-bit key for systems that require long-term security
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
          },
          true,
          ["decrypt"]
        );


        const encoded = 'YQo=';

        const ciphertext = await window.crypto.subtle.encrypt(
            {
              name: "RSA-OAEP"
            },
            importedPublicKey,
            base64StringToArrayBuffer(encoded)
        );

        console.log('ciphertext', arrayBufferToBase64String(ciphertext));

        const decrypted = await window.crypto.subtle.decrypt(
          {
            name: "RSA-OAEP"
          },
          importedPrivateKey,
          ciphertext
        );

        console.log('decrypted', decrypted);

        console.log(arrayBufferToBase64String(decrypted));

    }


    async encryptText(){

    }

    async decrypt(){

    }


    render() {
      return (
        <div>
          <p>Encrypt file</p>
          <button onClick={this.generateKey}>Generate Key</button>
          <button onClick={this.generateKey}>Encrypt</button>
          <button onClick={this.addToIPFS}>Add to IPFS</button>
        </div>
      );
    }
}