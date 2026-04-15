

import React from "react";

import "./styles.css";

import TabletEdge from "../TabletEdge"
import Templat from "../Templat";

import data from "../../compenents/DataBase.json";
import { loadExercice } from "../../services/service-api"

import gsap from "gsap";


type State = {
    nbcomplet: number
    exerciceContent: {
        instructionTitre: string,
        instructionText: string,
        defaultCode: any[],
        solutionCode: any[]
    }
}

type Props = {
    onCrossClick: () => void
};

export default class Tablet extends React.Component<Props, State> {


    constructor(props: Props) {

        super(props);

        this.state = {
            nbcomplet: 0,
            exerciceContent: {
                instructionTitre: "",
                instructionText: "",
                defaultCode: [],
                solutionCode: []
            }
        }

    }

    nextExercice = () => {
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

        loadExercice(1).then(data => {

            this.setState({
                exerciceContent: {
                    instructionTitre: data.nom,
                    instructionText: data.instruction,
                    defaultCode: JSON.parse(data.code_exercice),
                    solutionCode: JSON.parse(data.code_solution)
                }
            });
        });
    }


    render() {
        return (
            <div className="tablet">
                <TabletEdge value={this.state.nbcomplet} />
                <img onClick={() => this.props.onCrossClick()} className="tablet_cross" src="/assets/croix.svg" alt="croix" />
                <Templat
                    instructionTitre={this.state.exerciceContent.instructionTitre}
                    instructionText={this.state.exerciceContent.instructionText}
                    defaultCode={this.state.exerciceContent.defaultCode}
                    solutionCode={this.state.exerciceContent.solutionCode}

                    onValidation={() => this.nextExercice()}
                />
                <TabletEdge value={this.state.nbcomplet} right={true} />

            </div >
        )
    }
}