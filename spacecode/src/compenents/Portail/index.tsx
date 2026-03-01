

import React from "react";

import "./styles.css";

type State = {}
type Props = {
    nom: string
    href : string
    xpos?: number
    ypos?: number
}

export default class Partail extends React.Component<Props, State> {

    static defaultProps = {
        xpos: 0,
        ypos: 0,
    }

    render() {

        return (
            <a href={this.props.href} className="portail" style={{
                    position: "absolute",
                    transform:  `
                        translate(${this.props.xpos!}px, ${this.props.ypos!}px)
                        translate(-50%, -50%)
                    `,
                }}>
                <img src="/assets/portail.svg" alt="portail" />
                <span >{this.props.nom}</span>
            </a>
        )
    }
}
