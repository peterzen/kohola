import * as React from "react";

import DatastoreFactory, { ChainInfo } from '../store';


const store = DatastoreFactory.getInstance();

interface ChainInfoState {
    chainInfo: ChainInfo
}

export default class ChainInfoComponent extends React.Component<{}, ChainInfoState> {
    constructor(props: Object) {
        super(props);

        this.state = {
            chainInfo: new ChainInfo(undefined)
        }
    }

    componentDidMount() {
        store.getChainInfo()
        .then((chainInfo) => {
            this.setState({
                chainInfo: chainInfo
            })
        })
        .catch((err) => {
            console.error("ChainInfoComponent", err);
        });

    }

    render() {
        const chainInfo = this.state.chainInfo;
        return (
            <div>
                Block height: {chainInfo.getBestBlockHeight()}<br/>
                Block hash: {chainInfo.getBestBlockHash()}
            </div>
        )
    }
}