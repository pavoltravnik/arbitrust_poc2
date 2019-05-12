import React from 'react';
import { connect } from 'react-redux'

import { sha256, bufferText } from '.././helpers'
import * as actions from './actions'
import { getArbitersVersion, getParties } from './selectors'

class CreateContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CryptoID: '',
            hashCryptoID: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange = (e) => {
        const name = e.target.name;
        const id = parseInt(e.target.id, 10);
        const value = e.target.value;
        this.props.handleChange({name,id,value});
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.handleInputChange({
            [name]: value
        });
    }

    componentDidUpdate(_,prevState){
        if (prevState.parties !== this.state.parties || prevState.arbitersVersion !== this.state.arbitersVersion) {
            const CryptoID = `${this.state.parties.map(party => party.address).sort().join('.')}.${this.state.arbitersVersion}`;
            sha256(bufferText(CryptoID)).then(hashCryptoID => {
                this.setState({
                    hashCryptoID,
                    CryptoID,
                });
            });
        }
    }

    addParty = () => {
        this.props.addParty({address: '', pubKey: ''});
    }

    render() {
        const { arbitersVersion, parties } = this.props;
        return (
            <div>
                    <p>Create Contract</p>
                    {parties && parties.map((party, idx) =>
                        (
                            <div key={idx}>
                                <input
                                    type="text"
                                    name="address"
                                    id={idx}
                                    value={party.address}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="text"
                                    name="pubKey"
                                    id={idx}
                                    value={party.pubKey}
                                    onChange={this.handleChange}
                                />
                            </div>
                        )
                    )}
                    <input
                        type="text"
                        name="arbitersVersion"
                        placeholder="Arbitrators list version"
                        value={arbitersVersion}
                        onChange={this.handleInputChange}
                    />
                    <button onClick={this.addParty}>Add Party</button>
                    <p>{this.state.hashCryptoID}</p>
                    <p>{this.state.CryptoID}</p>
            </div>
        );
    }
}


export default connect((state) => {
    const arbitersVersion = getArbitersVersion(state);
    const parties = getParties(state);

    return {
        arbitersVersion,
        parties
    };
  }, actions)(CreateContract);