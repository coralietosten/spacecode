import React from "react";

import "./styles.css";


import PlanetarySystem from "../../compenents/PlanetarySystem";
import Exo1 from "../Exo1";

type State = {}
type Props = {}

export default class Myexo extends React.Component<Props, State> {


    render(){
        return(
            <main>
                <PlanetarySystem nbplanet={2}/>
                <Exo1/>
            </main>
        )
    }
}