import React from "react";

import "./styles.css";

import Templat from "../../compenents/Templat";
import data from "../../compenents/DataBase.json";


type State = {}
type Props = {}

export default class Exo1 extends React.Component<Props, State> {

    instructionTitre: string;
    instructionText: string;
    defaultCode: any;
    solutionCode: any[];

    constructor(props: Props){

        super(props);
        this.instructionTitre = data.exercices[0].instructionTitre;
        this.instructionText = data.exercices[0].instructionText;
        this.defaultCode = data.exercices[0].defaultCode;
        this.solutionCode = data.exercices[0].solutionCode;
    }

    render(){
        return(
            <main>
                <Templat
                    instructionTitre={this.instructionTitre}
                    instructionText={this.instructionText}
                    defaultCode={this.defaultCode}
                    solutionCode={this.solutionCode}
                />
            </main>
        )
    }
}