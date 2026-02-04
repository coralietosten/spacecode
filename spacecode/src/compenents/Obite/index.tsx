

import React from "react";

import "./styles.css";

type State = {}
type Props = {
    xpos? : number
    ypos? : number
    scale? : number
}

export default class Obite extends React.Component<Props, State> {

    static defaultProps = {
        xpos : 0,
        ypos : 0,
        scale : 1
    }

    private imgRef = React.createRef<HTMLImageElement>();

    public getDom(): HTMLImageElement | null {
        return this.imgRef.current;
    }

    render(){
        return(
            <img
                ref={this.imgRef}
                className="star"
                src="/assets/orbite.svg"
                alt=""
                style={{
                    position: "absolute",
                    transform: `
                        translate(${this.props.xpos}px, ${this.props.ypos}px)
                        scale(${this.props.scale})
                    `,
                    }}
            />
        )
    }
}