

import React from "react";

import "./styles.css";

type State = {}
type Props = {
    value : number
    right?: boolean
}

export default class TabletEdge extends React.Component<Props, State> {



    // rotate: 180deg;
    render() {

        let style : any = {left : 0}

        if (this.props.right){
            style = {rotate : `180deg`, right : 0, display: "flex"}
        }

        return (
            <div className="tabletEdge" style={style}>
                <img  src={`/assets/tabletEdgev${this.props.value%3}.svg`} alt="" />
            </div>

        )
    }
}