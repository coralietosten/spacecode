

import React from "react";

import "./styles.css";

import Editor from '@monaco-editor/react';
import DOMPurify from 'dompurify';

import JsonToObject from "../CodeStructure/JsonToObject";
import CodeVefif from "../CodeStructure/CodeVerif";
import Balise from "../CodeStructure/Balise";

declare global {// to del
    interface Window {
        _blinkInterval?: NodeJS.Timeout;
    }
}

type State = {
    codeAffiche: string
}
type Props = {
    instructionTitre: string;
    instructionText: string;
    defaultCode: any;
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
        }

        this.solutionCode = JsonToObject.parse(JSON.stringify(props.solutionCode));
        this.codeVefif = new CodeVefif(this.solutionCode);
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

    verifyExoCompletion = (html: string) => {

        return this.codeVefif.verifyCode(html);
    };

    onChange = (newValue: string | undefined) => {

        if (newValue === undefined) {
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
                const display = document.querySelector(".result-zone") as HTMLElement;
                if (display !== null) {
                    display.style.color = '';
                }
                window._blinkInterval = undefined;
            }
        }
    };


    ///

    render() {
        return (

            <div className="templat-content">
                <div>
                    <h1>{this.props.instructionTitre}</h1>
                    <p>{this.props.instructionText}</p>
                </div>
                <div>
                    <div className="code-zone">
                        <div className="menu-code-zone">
                            <button><span>Doc</span> <img src="/assets/docIcon.svg" alt="document" /></button>
                            <button><span>Aide</span><img src="/assets/aideIcon.svg" alt="aide" /></button>
                            <button><span>Réinisialiser</span> <img src="/assets/reinitialiserIcon.svg" alt="reset" /></button>
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
                            <button className="bouton-valider" onClick={this.props.onValidation}><span>Valdier</span></button>
                        </div>
                    </div>


                    <div className="result-zone" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.codeAffiche) }} />

                </div>
            </div>

        )
    }
}