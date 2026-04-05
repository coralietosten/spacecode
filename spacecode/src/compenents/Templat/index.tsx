

import React from "react";

import "./styles.css";

import TabletEdge from "../TabletEdge"
import Editor from '@monaco-editor/react';
import DOMPurify from 'dompurify';

import JsonToObject from "../CodeStructure/JsonToObject";
import CodeVefif from "../CodeStructure/CodeVerif";
import Balise from "../CodeStructure/Balise";
import TextToObject from "../CodeStructure/TextToObject";

declare global {// to del
    interface Window {
        _blinkInterval?: NodeJS.Timeout;
    }
}

type State = {
    codeAffiche: string
    nbcomplet: number
}
type Props = {
    instructionTitre: string;
    instructionText: string;
    defaultCode: any;
    solutionCode: any[];
};

export default class Templat extends React.Component<Props, State> {

    solutionCode: Balise[];

    codeVefif: CodeVefif;

    constructor(props: Props) {
        super(props)

        this.state = {
            codeAffiche: JsonToObject.parse(JSON.stringify(props.defaultCode))?.map(balise => balise.getCode()).join('\n') || '',
            nbcomplet: 0
        }

        this.solutionCode = JsonToObject.parse(JSON.stringify(props.solutionCode));
        this.codeVefif = new CodeVefif(this.solutionCode);
    }


    exerciceComplet = () => {
        if (true) // vérifie la complession
        {
            this.setState({ nbcomplet: this.state.nbcomplet + 1 })
        }
    }

    verifyExoCompletion = (html: string) => {

        return this.codeVefif.verifyCode(html);
    };

    onChange = (newValue: string | undefined) => {

        if (newValue == undefined) {
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
        } else if (! TextToObject.parse(newValue).isValid) {
            console.log('Code HTML invalide');
            clearInterval(window._blinkInterval);
            const display = document.querySelector(".result-zone") as HTMLElement;
            if (display !== null) {
                display.style.color ='#c90300';
            }
            window._blinkInterval = undefined;
            
        }else {
            console.log('Structure incorrecte');
            clearInterval(window._blinkInterval);
            const display = document.querySelector(".result-zone") as HTMLElement;
            if (display !== null) {
                display.style.color ='#ffd000';
            }
            window._blinkInterval = undefined;
        }
    };

    render() {
        return (
            <div className="templat">
                <TabletEdge value={this.state.nbcomplet} />
                <div className="templat-content">
                    <div>
                        <h1>{this.props.instructionTitre}</h1>
                        <p>{this.props.instructionText}</p>
                    </div>
                    <div>
                        <div className="code-zone">
                            <div className="menu-code-zone">
                                <button><span>Doc</span> <img src="/assets/docIcon.svg" /></button>
                                <button><span>Aide</span><img src="/assets/aideIcon.svg" /></button>
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


                        <div className="result-zone" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.codeAffiche) }} />

                    </div>
                </div>
                <TabletEdge value={this.state.nbcomplet} rotate={180} />

            </div >
        )
    }
}