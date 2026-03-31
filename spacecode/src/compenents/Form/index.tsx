

import React from "react";

import "./styles.css";

import TabletEdge from "../TabletEdge"
import Templat from "../Templat";

import data from "../../compenents/DataBase.json";

import gsap from "gsap";
import SmallScreenEdge from "../SmallScreenEdge";
import InputText from "../inputText";


type State = {
}
type Props = {
    children?: React.ReactNode;
};

export default class Form extends React.Component<Props, State> {

    constructor(props : Props){
        
        super(props);
    }

    render() {
        return (
            <div className="from" >
                {this.props.children}
                <div className="formbutton">
                    <button>Valider</button>
                    <button>Retour</button>
                </div>
            </div>
        )
    }
}