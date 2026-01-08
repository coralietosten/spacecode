import React from "react";
import MonacoEditor from "react-monaco-editor";

import "./styles.css";

declare global {
  interface Window {
    _blinkInterval?: NodeJS.Timeout;
  }
}

type State = {
    codeAffiche: string;
};
type Props = {
    instructionTitre: string;
    instructionText: string;
    defaultCode: string;
    solutionCode: string[];
};

export default class ExoTemplate1 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            codeAffiche: props.defaultCode,
        };
    }

    skipSpaces = (html: string, i: number): number => {
      while (i < html.length && /\s/.test(html[i])) i++;
      return i;
    };

    match = (html: string, i: number, str: string): boolean => {
      i = this.skipSpaces(html, i);
      if (html.startsWith(str, i)) {
        return true;
      }
      return false;
    };

    verifyExoCompletion = (html : string) => {

        let i = 0;
        
        for (let solution of this.props.solutionCode) {

            // console.log("Checking solution:", solution);
            // console.log("Current index:", i);
            // console.log("HTML substring:", html.substring(i, i + solution.length));

            i = this.skipSpaces(html, i);

            if(! this.match(html, i, solution) ) {
                return false;
            }

            i += solution.length;
        }

        return true;
    };

    onChange = (newValue: string) => {

        this.setState({ codeAffiche: newValue });

        if (this.verifyExoCompletion(newValue)) {
            
            console.log('Table with tr found');

            const display = document.getElementById("zone-affichage");
            if (display) {
                let blink = true;
                if (window._blinkInterval) {
                    clearInterval(window._blinkInterval);
                }
                window._blinkInterval = setInterval(() => {
                    display.style.color = blink ? '#90EE90' : '';
                    blink = !blink;
                }, 200);
            }
        } else {
            console.log('Structure incorrecte');
            if (window._blinkInterval) {
                clearInterval(window._blinkInterval);
                window._blinkInterval = undefined;
                const display = document.getElementById("zone-affichage");
                if (display) {
                    display.style.color = '';
                }
            }
        }
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