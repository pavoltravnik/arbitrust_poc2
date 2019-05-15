import React from 'react';
import { connect } from 'react-redux'

import * as actions from './actions'
import { getArbitersVersion, getParties, getCryptoID, getHashCryptoID } from './selectors'

class CreateContract extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange = (e) => {
        const name = e.target.name;
        const id = parseInt(e.target.id, 10);
        const value = e.target.value;

        const { dispatch } = this.props;
        dispatch(actions.handleChange({
            name,
            id,
            value
        }));

        dispatch(actions.updateHash());
    };

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        const { dispatch } = this.props;
        dispatch(actions.handleInputChange({
            name,
            value,
        }));

        dispatch(actions.updateHash());
    }

    addParty = () => {
        this.props.addParty({address: '', pubKey: ''});
    }

    render() {
        const { arbitersVersion, parties, CryptoID, hashCryptoID } = this.props;
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
                                    placeholder="Bitcoin address"
                                />
                                <input
                                    type="text"
                                    name="pubKey"
                                    id={idx}
                                    value={party.pubKey}
                                    onChange={this.handleChange}
                                    placeholder="PGP key"
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
                    <p>{CryptoID && CryptoID}</p>
                    <p>{hashCryptoID && hashCryptoID}</p>
            </div>
        );
    }
}


export default connect((state) => {
    const arbitersVersion = getArbitersVersion(state);
    const parties = getParties(state);
    const CryptoID = getCryptoID(state);
    const hashCryptoID = getHashCryptoID(state);

    return {
        arbitersVersion,
        parties,
        CryptoID,
        hashCryptoID,
    };
  })(CreateContract);