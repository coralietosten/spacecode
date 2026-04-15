

import React from "react";

import "./styles.css";

type State = {}
type Props = {
    right?: boolean
}

export default class SmallScreenEdge extends React.Component<Props, State> {



    // rotate: 180deg;
    render() {

        let style : any = {left : 0, position: "absolute"}

        if (this.props.right){
            style = {rotate : `180deg`, right : 0, display: "flex",position: "absolute"}
        }

        return (
            <div  style={style}>
                <img  src={`/assets/SmallScreenEdge.png`} alt="SmallScreenEdge" />
            </div>

        )
    }
}