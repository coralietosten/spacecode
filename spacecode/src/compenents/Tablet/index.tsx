

import React from "react";

import "./styles.css";

import TabletEdge from "../TabletEdge"
import Editor from '@monaco-editor/react';
import DOMPurify from 'dompurify';

type State = {
    codeAffiche : string
    nbcomplet : number
}
type Props = {
    instructionTitre: string;
    instructionText: string;
    defaultCode: string;
    solutionCode: string[];
};

export default class Tablet extends React.Component<Props, State> {

    constructor(props : Props){
        super(props)

        this.state = {
            codeAffiche : props.defaultCode,
            nbcomplet : 0
        }
    }


    exerciceComplet = () =>{
        if (true) // vérifie la complession
        {
            this.setState({nbcomplet:this.state.nbcomplet+1})
        }
    }



    ///

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


            i = this.skipSpaces(html, i);

            if(! this.match(html, i, solution) ) {
                return false;
            }

            i += solution.length;
        }

        return true;
    };

    onChange = (newValue: string | undefined) => {
        
        if (newValue == undefined){
            return
        }

        this.setState({ codeAffiche: newValue });

        if (this.verifyExoCompletion(newValue)) {
            
            console.log('Table with tr found');

            const display = document.querySelector(".result-zone") as HTMLElement;
            console.log(display)
            if (display !== null) {
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


    ///

    render() {
        return (
            <div className="tablet">
                <TabletEdge value={this.state.nbcomplet} />
                <div className="tablet-content">
                    <div className="code-zone">
                        <div className="menu-code-zone">
                            <button><span>Doc</span> <img src="/assets/docIcon.svg" /></button>
                            <button><span>Aide</span><img src="/assets/aideIcon.svg" /></button>
                            <button><span>Réinisialiser</span> <img src="/assets/reinisialiserIcon.svg" /></button>
                        </div>
                        <div className="editor-container">
                            <Editor
                                height= "500px"
                                width= "500px"
                                language="html"
                                theme="vs-dark"
                                value={this.state.codeAffiche}
                                onChange={(val) => this.onChange(val)}
                                options={{
                                    automaticLayout: true,
                                    minimap: { enabled: true },
                                    suggest: { showKeywords: true, showSnippets: true }
                                }}
                            />
                        </div>
                        <div className="menu-code-zone">
                            <button className="bouton-valider" onClick={this.exerciceComplet}><span>Valdier</span></button>
                        </div>
                    </div>


                    <div className="result-zone" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.codeAffiche) }} />


                </div>
                <TabletEdge value={this.state.nbcomplet} rotate={180} />

            </div >
        )
    }
}