import React from "react";

import "./styles.css";

import Tablet from "../../compenents/Tablet";


type State = {}
type Props = {}

export default class Exo1 extends React.Component<Props, State> {

    instructionTitre: string;
    instructionText: string;
    defaultCode: string;
    solutionCode: string[];

    constructor(props: Props){
        super(props);
        this.instructionTitre = "Niveau 1";
        this.instructionText = "vous devez corriger le programme";
        this.defaultCode = 
`
<h1>Bonjour le monde !<>
<p>Ceci est mon premier code HTML.</p>
`;
        this.solutionCode = ["<h1>Bonjour le monde !</h1>", "<p>Ceci est mon premier code HTML.</p>"];
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