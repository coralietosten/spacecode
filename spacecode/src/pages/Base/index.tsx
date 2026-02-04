import React from "react";

import "./styles.css";

import Obite from "../../compenents/Obite";


type State = {}
type Props = {}

export default class Base extends React.Component<Props, State> {


    render(){
        return(
            <main>
                <Obite/>
            </main>

        )
    }
}