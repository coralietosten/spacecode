

import React from "react";

import "./styles.css";

import Editor from '@monaco-editor/react';
import DOMPurify from 'dompurify';

import JsonToObject from "../CodeStructure/JsonToObject";
import CodeVefif from "../CodeStructure/CodeVerif";
import Balise from "../CodeStructure/Balise";
import TextToObject from "../CodeStructure/TextToObject";
import Indice from "../Indice";

declare global {// to del
    interface Window {
        _blinkInterval?: NodeJS.Timeout;
    }
}

type State = {
    codeAffiche: string
    codeResultat: string
    nbcomplet: number
}
type Props = {
    instructionTitre: string;
    instructionText: string;
    defaultCode: any[];
    solutionCode: any[];

    onValidation : () => void
};

export default class Templat extends React.Component<Props, State> {

    solutionCode: Balise[];

    codeVefif: CodeVefif;

    constructor(props: Props) {
        super(props)

        this.state = {
            codeAffiche: JsonToObject.parse(JSON.stringify(props.defaultCode))?.map(balise => balise.getCode()).join('\n') || '',
            codeResultat: '',
            nbcomplet: 0
        }

        console.log("this.state.codeAffiche",this.state.codeAffiche);

        this.solutionCode = JsonToObject.parse(JSON.stringify(props.solutionCode));
        this.codeVefif = new CodeVefif(this.solutionCode);
    }

    componentDidUpdate(prevProps : Props) {
        if (prevProps.defaultCode !== this.props.defaultCode) {

            console.log("prop modifiée !");
            this.solutionCode = JsonToObject.parse(JSON.stringify(this.props.solutionCode));
            this.codeVefif = new CodeVefif(this.solutionCode);
            this.setState({ codeAffiche: JsonToObject.parse(JSON.stringify(this.props.defaultCode))?.map(balise => balise.getCode()).join('\n') || '',
                codeResultat : this.codeVefif.colorCode(JsonToObject.parse(JSON.stringify(this.props.defaultCode))?.map(balise => balise.getCode()).join('\n') || '').code
            })
            

        }
    }


    exerciceComplet = () => {
        if (true) // vérifie la complession
        {
            this.setState({ nbcomplet: this.state.nbcomplet + 1 })
        }
    }

    // verifyExoCompletion = (html: string) => {

    //     return this.codeVefif.verifyCode(html);
    // };

    onChange = (newValue: string | undefined) => {

        if (newValue === undefined) {
            return
        }

        const resultColorCode = this.codeVefif.colorCode(newValue);

        if (! resultColorCode.structureIsValid) {
            this.setState({ codeResultat: newValue });
            console.log('Code HTML invalide');
            clearInterval(window._blinkInterval);
            window._blinkInterval = undefined;
            const display = document.querySelector(".result-zone") as HTMLElement;
            if (display !== null) {
                display.style.color ='#c90300';
            }
        }else {
            this.setState({ codeResultat: resultColorCode.code });
            // console.log(this.state.codeResultat);
        }

        // this.setState({ codeAffiche: newValue }); // todo

        // if (this.verifyExoCompletion(newValue)) {

        //     console.log('Table with tr found');

        //     const display = document.querySelector(".result-zone") as HTMLElement;
        //     console.log(display)
        //     if (display !== null) {
        //         let blink = true;
        //         if (window._blinkInterval) {
        //             clearInterval(window._blinkInterval);
        //         }
        //         window._blinkInterval = setInterval(() => {
        //             display.style.color = blink ? '#90EE90' : '';
        //             blink = !blink;
        //         }, 200);
        //     }
        // } else if (! TextToObject.parse(newValue).isValid) {
        //     console.log('Code HTML invalide');
        //     clearInterval(window._blinkInterval);
        //     const display = document.querySelector(".result-zone") as HTMLElement;
        //     if (display !== null) {
        //         display.style.color ='#c90300';
        //     }
        //     window._blinkInterval = undefined;
            
        // }else {
        //     console.log('Structure incorrecte');
        //     clearInterval(window._blinkInterval);
        //     const display = document.querySelector(".result-zone") as HTMLElement;
        //     if (display !== null) {
        //         display.style.color ='#ffd000';
        //     }
        //     window._blinkInterval = undefined;
        // }
    };

    render() {
        console.log("aurevoir",this.props.instructionTitre)
        return (
                <div className="templat-content">
                    <div>
                        <h1>{this.props.instructionTitre}</h1>
                        <p>{this.props.instructionText}</p>
                    </div>
                    <div>
                        <div className="code-zone">
                            <div className="menu-code-zone">
                                <button><span>Doc</span> <img src="/assets/docIcon.svg" /></button>
                                <Indice/>
                                <button><span>Réinitialiser</span> <img src="/assets/reinitialiserIcon.svg" /></button>
                            </div>
                            <div className="editor-container">
                                <Editor
                                    height="500px"
                                    width="600px"
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


                        <div className="result-zone" dangerouslySetInnerHTML={{ __html: this.state.codeResultat }} />

                    </div>
                </div>
                

        )
    }
}