

import React from "react";

import "./styles.css";

import TabletEdge from "../TabletEdge"
import Templat from "../Templat";

import data from "../../compenents/DataBase.json";

import gsap from "gsap";


type State = {
    nbcomplet: number
}
type Props = {

};

export default class Tablet extends React.Component<Props, State> {

    instructionTitre: string;
    instructionText: string;
    defaultCode: any;
    solutionCode: any[];

    constructor(props: Props) {

        super(props);

        this.state = {
            nbcomplet: 0
        }

        this.instructionTitre = data.exercices[0].instructionTitre;
        this.instructionText = data.exercices[0].instructionText;
        this.defaultCode = data.exercices[0].defaultCode;
        this.solutionCode = data.exercices[0].solutionCode;
    }

    nextExercice = () =>{
        this.setState({ nbcomplet: this.state.nbcomplet + 1 })

        //TODO next exercice
    }

    componentDidMount(): void {
        const template = document.querySelector(".tablet")

        gsap.fromTo(template,
        { width: "0px" },
        { 
            width: "100%",
            duration: 1.5,
            ease: "power3.inOut",
            clearProps: "width"
        }
        );
    }


    render() {
        return (
            <div className="tablet">
                <TabletEdge value={this.state.nbcomplet} />
                <Templat
                    instructionTitre={this.instructionTitre}
                    instructionText={this.instructionText}
                    defaultCode={this.defaultCode}
                    solutionCode={this.solutionCode}

                    onValidation ={() => this.nextExercice()}
                />
                <TabletEdge value={this.state.nbcomplet} right={true} />

            </div >
        )
    }
}