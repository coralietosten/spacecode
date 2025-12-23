

import React from "react";

import "./styles.css";

import TabletEdge from "../TabletEdge"

type State = {}
type Props = {}

export default class Tablet extends React.Component<Props, State> {


    render(){
        return(
            <div className="tablet">
                <TabletEdge/>
                <div className="tabletContent">
                    instructions
                </div>
                <TabletEdge rotate={180}/>
                
            </div>
        )
    }
}