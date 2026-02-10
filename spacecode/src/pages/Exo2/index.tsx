import React from "react";

import "./styles.css";

import Tablet from "../../compenents/Tablet";
import data from "../../compenents/DataBase.json";


type State = {}
type Props = {}

export default class Exo2 extends React.Component<Props, State> {

    instructionTitre: string;
    instructionText: string;
    defaultCode: any;
    solutionCode: any[];

    constructor(props: Props){

        super(props);
        this.instructionTitre = data.exercices[1].instructionTitre;
        this.instructionText = data.exercices[1].instructionText;
        this.defaultCode = data.exercices[1].defaultCode;
        this.solutionCode = data.exercices[1].solutionCode;
    }

    render(){
        return(
            <main>
                <Tablet
                    instructionTitre={this.instructionTitre}
                    instructionText={this.instructionText}
                    defaultCode={this.defaultCode}
                    solutionCode={this.solutionCode}
                />
            </main>
        )
    }
}