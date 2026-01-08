import React from "react";
import ExoTemplate1 from "../../ExoTemplate1";

import "./styles.css";




type State = {}
type Props = {}

export default class Exo1 extends React.Component<Props, State> {

    instructionTitre: string;
    instructionText: string;
    defaultCode: string;
    solutionCode: string[];

    constructor(props: Props){
        super(props);
        this.instructionTitre = "Voici l'exo 1";
        this.instructionText = "faites ce que vous voulez";
        this.defaultCode = 
`
<h1>Bonjour le monde !<>
<p>Ceci est mon premier code HTML.</p>
`;
        this.solutionCode = ["<h1>Bonjour le monde !</h1>", "<p>Ceci est mon premier code HTML.</p>"];
    }

    render(){
        return(
            <ExoTemplate1
                instructionTitre={this.instructionTitre}
                instructionText={this.instructionText}
                defaultCode={this.defaultCode}
                solutionCode={this.solutionCode}
            />
        )
    }
}