

import React from "react";

import "./styles.css";

type State = {}
type Props = {
    xpos? : number
    ypos? : number
    rotate? : number
    scale? : number
    onClick? : () => void  
}

export default class Star extends React.Component<Props, State> {

    static defaultProps = {
        xpos : 0,
        ypos : 0,
        rotate : 0,
        scale : 1
    }

    private imgRef = React.createRef<HTMLImageElement>();

    public getDom(): HTMLImageElement | null {
        return this.imgRef.current;
    }

    // rotate: 180deg;
    render(){
        const halfWidth = (76*this.props.scale!)/2
        return(
            <img
                onClick={this.props.onClick}
                ref={this.imgRef}
                className="star"
                src="/assets/starOn.svg"
                alt=""
                style={{
                    position: "absolute",
                    transform: `
                        translate(${this.props.xpos!-halfWidth}px, ${this.props.ypos!-halfWidth}px)
                        rotate(${this.props.rotate}deg)
                        scale(${this.props.scale})
                    `,
                    }}
            />
        )
    }
}