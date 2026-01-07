

import React from "react";

import "./styles.css";

type State = {}
type Props = {
    value : number
    rotate?: number
}

export default class TabletEdge extends React.Component<Props, State> {



    // rotate: 180deg;
    render() {
        return (
            <div className="tabletEdge">
                <img style={{rotate : `${this.props.rotate || 0}deg`}} src={`/assets/tabletEdgeV${this.props.value%3}.svg`} alt="" />
            </div>

        )
    }
}