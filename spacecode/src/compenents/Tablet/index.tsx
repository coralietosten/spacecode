

import React from "react";

import "./styles.css";

import TabletEdge from "../TabletEdge"
import Editor from '@monaco-editor/react';
import DOMPurify from 'dompurify';

type State = {
    codeAffiche : string
    nbcomplet : number
}
type Props = {}

export default class Tablet extends React.Component<Props, State> {

    constructor(props : Props){
        super(props)

        this.state = {
            codeAffiche : "<div>\n bojnjour\n</div>\n",
            nbcomplet : 0
        }
    }

    updatecode = (value : string | undefined) => {
        console.log(value)
        if (value){
            this.setState({codeAffiche : value})
        }
    }

    exerciceComplet = () =>{
        if (true) // vérifie la complession
        {
            this.setState({nbcomplet:this.state.nbcomplet+1})
        }
    }

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
                                value={"<div>\n bojnjour\n</div>\n"}
                                onChange={this.updatecode}
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