import React from 'react';

export class IPFS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          key: '',
        };
        this.addToIPFS = this.addToIPFS.bind(this);

    }

    async addToIPFS(){

    }

    render() {
      return (
        <div>
          <h1>Add to IPFS</h1>
          <button onClick={this.generateKey}> Add to IPFS</button>
        </div>
      );
    }
}