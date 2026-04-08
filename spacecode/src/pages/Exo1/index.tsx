import React from "react";

import "./styles.css";

import Templat from "../../compenents/Templat";
import datab from "../../compenents/DataBase.json";
import {loadExercice} from "../../services/service-api"


type State = {
    instructionTitre: string,
    instructionText: string,
    defaultCode: any[],
    solutionCode: any[]
}
type Props = {}

export default class Exo1 extends React.Component<Props, State> {
    
    constructor(props: Props){
        
        super(props);

        this.state = {
            instructionTitre: "",
            instructionText: "",
            defaultCode: [],
            solutionCode: []
        };
    }

    componentDidMount(){
        loadExercice(1).then(data => {
            this.setState({
                instructionTitre: data.nom,
                instructionText: data.instruction,
                defaultCode: JSON.parse(data.code_exercice),
                solutionCode : JSON.parse(data.code_solution)
            });
        });
    }


    render(){
        return(
            <main>
                <Templat
                    instructionTitre={this.state.instructionTitre}
                    instructionText={this.state.instructionText}
                    defaultCode={this.state.defaultCode}
                    solutionCode={this.state.solutionCode}
                />
            </main>
        )
    }
}