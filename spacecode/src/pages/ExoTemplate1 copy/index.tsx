import React from "react";

import "./styles.css";


import Tablet from "../../compenents/Tablet";

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

            console.log("Checking solution:", solution);
            console.log("Current index:", i);
            console.log("HTML substring:", html.substring(i, i + solution.length));

            i = this.skipSpaces(html, i);
            if(! this.match(html, i, solution) ) {
                return false;
            }
            i += solution.length;
        }

        return true;
    };

    onChange = (newValue: string) => {
        //verifier html safety
        this.setState({ codeAffiche: newValue });

        if (this.verifyExoCompletion(newValue)) {
            alert("Exercice terminé !");
        };
    };

    render(){

        return(
            <main>

                <Tablet/>
                
            </main>
        )
    }
}