import React from 'react';

export class ShowArbitrators extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isLoadedArb: false,
            transaction: null,

        }
    }

    componentDidMount(){
        this.setState({
            isLoaded: false,
          });
        fetch("https://api.blockcypher.com/v1/ltc/main/txs/c7171bef1531ba29a71cfe21711463e04265be5a727002869c1a5d251281997f")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              transaction: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )


        this.setState({
            isLoadedArb: false,
          });
        fetch("https://raw.githubusercontent.com/arbitrust/arbitrust/c29a69da19850f4f9af4a784e3d824e2faef82c3/arbitrators.json")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoadedArb: true,
              arbiters: result
            });
          },
          (error) => {
            this.setState({
              isLoadedArb: true,
              error
            });
          }
        )
    }

    render(){
        // console.log(this.state.arbiters);
        // console.log(this.state.transaction);
        return (
            <div>
                <p>Show Arbitrators</p>

            </div>
        )
    }
}