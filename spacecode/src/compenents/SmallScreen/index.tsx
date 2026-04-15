

import React from "react";

import "./styles.css";

import TabletEdge from "../TabletEdge"
import Templat from "../Templat";

import data from "../../compenents/DataBase.json";

import gsap from "gsap";
import SmallScreenEdge from "../SmallScreenEdge";


type State = {
    nbcomplet: number
}
type Props = {
    children?: React.ReactNode;
};



export default class SmallScreen extends React.Component<Props, State> {


    constructor(props: Props) {

        super(props);

    }

    componentDidMount(): void {
        const smallScreen = document.querySelector(".tablet")


        gsap.fromTo(smallScreen,
            { width: "0px" },
            {
                width: "100%",
                duration: 1.5,
                ease: "power3.inOut",
                clearProps: "width"
            }
        );
    }

    render() {


        return (
            <div className="tablet">
                <SmallScreenEdge />
                {this.props.children}
                <SmallScreenEdge right={true} />
            </div >
        )
    }
}