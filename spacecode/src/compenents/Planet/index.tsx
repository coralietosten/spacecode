

import React from "react";

import { RGB, randomColor, generateAnaloguesRGB, rgbToHex } from "../../extensions/colors"

import "./styles.css";

type State = {}
type Props = {
    xpos?: number
    ypos?: number
    rad?:number
    distance? : number
    scale?: number
}

export default class Planet extends React.Component<Props, State> {

    color1: RGB
    color2: RGB

    private svgref = React.createRef<SVGSVGElement>()

    constructor(props: Props) {
        super(props)

        this.color1 = randomColor()
        this.color2 = generateAnaloguesRGB(this.color1)[0]
    }

    static defaultProps = {
        xpos: 0,
        ypos: 0,
        rad:0,
        distance : 0,
        scale: 1
    }

    public getDom(): SVGSVGElement | null {
        return this.svgref.current;
    }

    render() {

        const xpos = this.props.xpos! +(Math.sin(this.props.rad!)*this.props.distance!)
        const ypos = this.props.ypos! +(Math.cos(this.props.rad!)*this.props.distance!)

        return (

            <svg ref={this.svgref} width="110" height="110" viewBox="0 0 110 110" fill="none"
                className="planet"
                style={{
                    position: "absolute",
                    transform:  `
                        translate(${xpos!}px, ${ypos!}px)
                        translate(-50%, -50%)
                        scale(${this.props.scale})
                    `,
                }}>
                <path d="M0 55C0 85.3757 24.6243 110 55 110C85.3757 110 110 85.3757 110 55C110 24.6243 85.3757 0 55 0C24.6243 0 0 24.6243 0 55Z"
                    fill={rgbToHex(this.color1)} />
                <path d="M106.792 73.5446C105.227 74.4821 103.424 75.488 101.388 76.5059C92.8648 80.7677 80.2753 85.2695 64.0664 86.1702C47.7811 87.075 30.989 84.8129 18.2295 82.3066C13.4026 81.3585 9.16377 80.3734 5.76139 79.5208C9.44049 86.8943 14.7237 93.3256 21.1585 98.3555C23.0534 98.8233 25.0611 99.2611 27.1634 99.6553C38.3215 101.747 52.2702 102.682 66.2435 100.819C78.0293 99.2474 89.0934 94.4049 97.9544 89.3464C101.716 84.6479 104.723 79.3204 106.792 73.5446Z"
                    fill={rgbToHex(this.color2)} />
                <path d="M94.1374 16.3604C93.2854 17.9204 92.2226 19.6164 90.9004 21.3411C85.8963 27.8683 77.1562 34.9118 62.1185 36.681C46.8271 38.4798 31.0145 36.2326 18.9671 33.5049C13.8164 32.3387 9.37671 31.0785 5.9834 30.0316C2.15884 37.5248 0 46.01 0 55C0 56.9691 0.106117 58.9138 0.307938 60.8294C5.17596 62.0553 11.3335 63.1348 18.1221 63.9268C31.9713 65.5424 48.6324 66.0116 62.5768 64.1523C76.7012 62.2689 89.7939 55.6961 99.2936 49.6719C103.015 47.312 106.204 45.0222 108.711 43.1084C106.442 32.8123 101.286 23.6003 94.1374 16.3604Z"
                    fill={rgbToHex(this.color2)} />
            </svg>


        )
    }
}
