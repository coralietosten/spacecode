

import React from "react";

import "./styles.css";

type State = {}
type Props = {
    xpos?: number
    ypos?: number
    scale?: number
}

export default class Obite extends React.Component<Props, State> {

    static defaultProps = {
        xpos: 0,
        ypos: 0,
        scale: 1
    }

    render() {

        let dim = 100*(this.props.scale || 1)
        let dim2 = dim + 1

        const left = this.props.xpos! - dim2
        const top = this.props.ypos! - dim2
        return (
            <svg style={{top:top,left:left}} width={dim2*2} height={dim2*2} viewBox={`0 0 ${dim2*2} ${dim2*2}`} className="orbite">
                <circle
                    cx={dim2}
                    cy={dim2}
                    r={dim}
                    fill="none"
                    stroke="white"
                    strokeOpacity="1"
                    strokeWidth={1}
                />
            </svg>
        )   
    }
}
