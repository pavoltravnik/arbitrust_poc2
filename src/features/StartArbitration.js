import React from 'react';
import { sha256 } from './helpers';
import TrezorConnect from 'trezor-connect';

const TREZOR_CONNECT_MANIFEST = {
    email: 'info@arbitrust.org',
    appUrl: 'https://arbitrust.org',
}

function ascii2hex(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}
export class StartArbitration extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fileAttached: false,
            documentHash:'',
        }

        this.handleAttachmentChange = this.handleAttachmentChange.bind(this);
        this.handleOPreturn = this.handleOPreturn.bind(this);
        TrezorConnect.manifest(TREZOR_CONNECT_MANIFEST);
    }

    handleAttachmentChange(e) {
        e.preventDefault();
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            sha256(e.target.result).then(documentHash => {
                this.setState({
                    documentHash
                });
            });
        }.bind(this);
        reader.readAsArrayBuffer(file);
    }

    async handleOPreturn(e){
        e.preventDefault();
        const opreturnRegistration = await TrezorConnect.composeTransaction({
            outputs: [
                { type: "opreturn", dataHex: ascii2hex('wow arbitrust test') },
                { amount: "9997452", address: 'LeNkYGHa9wkZN88acBh6RnMuDo214xh29G'}
            ],
            coin: "LTC",
            push: true
        });
        console.log(opreturnRegistration);
    }

    render(){
        return (
            <div>
                <p>Commit Arbitration</p>
                <form onSubmit={this.handleUploadImage}>
                    <input type="file" accept=".pdf" onChange={this.handleAttachmentChange}/>
                    <p>{this.state.documentHash}</p>
                    <button onClick={this.handleOPreturn}>Add OP_RETURN</button>
                </form>
            </div>
        )
    }
}