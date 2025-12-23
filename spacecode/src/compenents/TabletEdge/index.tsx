

import React from "react";

import "./styles.css";

type State = {}
type Props = {
    rotate? : number
}

export default class TabletEdge extends React.Component<Props, State> {


    
    // rotate: 180deg;
    render(){
        console.log(this.props.rotate || 0)
        return(
            <div className="tabletEdge">
                <img style={{rotate : `${this.props.rotate || 0}deg`}} src="/assets/tabletEdge.svg" alt="" />
            </div>
        )
    }
}