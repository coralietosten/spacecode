import React from "react";
import MonacoEditor from "react-monaco-editor";
import DOMPurify from 'dompurify';

import "./styles.css";

type State = {
    codeAffiche: string;
};
type Props = {
    instructionTitre: string;
    instructionText: string;
    defaultCode: string;
    solutionCode: string;
};

export default class ExoTemplate1 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            codeAffiche: props.defaultCode,
        };
    }

    onChange = (newValue: string) => {
        newValue = DOMPurify.sanitize(newValue)
        this.setState({ codeAffiche: newValue });
    };

    render(){

        return(
            <main>

                <h1>Exo1</h1>

                <div className = "content">

                    <div className = "instructions">
                        <h2 id="instruction-titre">{this.props.instructionTitre}</h2>
                        <p id="instruction-text">{this.props.instructionText}</p>
                    </div>


                    <div className = "work-space">

                        <div className="first-panel">

                            <MonacoEditor
                                language="html"
                                theme="vs-dark"
                                value={this.state.codeAffiche}
                                onChange={this.onChange}
                            />
                                
                        </div>

                        <div className="first-panel">
                            <div id="zone-affichage" className="zone" dangerouslySetInnerHTML={{ __html: this.state.codeAffiche }}/>
                        </div>
                    </div>

                </div>

                <footer>
                    <h3><a href="/"> Retour a l'acceuil</a></h3>
                </footer>
            </main>

        )
    }
}