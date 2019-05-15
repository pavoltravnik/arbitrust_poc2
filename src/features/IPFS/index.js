import React from 'react';
import { connect } from 'react-redux';

class IPFS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          key: '',
          documentHash:'',
          file: null,
        };
        this.addToIPFS = this.addToIPFS.bind(this);
        this.handleAttachmentChange = this.handleAttachmentChange.bind(this);


    }

    async addToIPFS(){
      if(this.state.file) {
        const data = new FormData();
        data.append('file', this.state.file);
        // console.log(data);
        fetch('http://37.205.14.190:3000/upload', {
          method: 'POST',
          body: data
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          response = JSON.parse(response);
          this.setState({
            documentHash: response.Hash,
          });
        });
      } else {
        return;
      }


    }

    handleAttachmentChange(e) {
      e.preventDefault();
      const file = e.target.files[0];
      this.setState({
        file
      });
  }


    render() {
      return (
        <div>

          <p>Deliver documents</p>
          <input type="file" accept=".pdf" onChange={this.handleAttachmentChange}/>
          <button onClick={this.addToIPFS}>Upload to IPFS</button>
          <button onClick={this.addToIPFS}>Add OP_RETURN</button>
          {this.state.documentHash &&
            <div>
              <br />
              <a href={`https://ipfs.io/ipfs/${this.state.documentHash}`} target="_blank" rel="noopener noreferrer">Open document</a>
              <p>Link to file: https://ipfs.io/ipfs/{this.state.documentHash}</p>
              <p>If you are looking for alternative IPFS gateways, you can find them here:</p>
              <a href="https://ipfs.github.io/public-gateway-checker/" target="_blank" rel="noopener noreferrer">Public IPFS gateway checker</a>
            </div>
          }
        </div>
      );
    }
}

export default connect(null, null)(IPFS);