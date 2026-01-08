import React from "react";

import "./styles.css";


import Tablet from "../../compenents/Tablet";
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
            }
        }
    };

    render(){

        return(
            <main>

                
            </main>
        )
    }
}