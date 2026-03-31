import React from "react";

import "./styles.css";
import Star from "../../compenents/Star";
import PlanetarySystem from "../../compenents/PlanetarySystem";


interface Position {
    x: number;
    y: number;
    scale: number;
    rotate: number;
}



type State = {}
type Props = {}

export default class Home extends React.Component<Props, State> {

    private elementpossRef: (HTMLElement | null)[] = [];
    private elementDatas: Position[];

    private width: number;
    private height: number;

    constructor(props: Props) {
        super(props);

        this.width = window.innerWidth
        this.height = window.innerHeight

        this.elementDatas = Array.from({ length: 10 }, (s, i) => {
            
            return ({
                x: Math.random() * this.width-50,
                y: Math.random() * this.height-50,
                scale: Math.random()*0.5 +0.5,
                rotate: Math.random() * 360
            })
        })
    }

    render() {

        let elemlist : any = [];
        Array.from({ length: 7 }, (s, i) => {
            const elem :any = this.elementDatas[i]
            elemlist.push(
            <Star
            key={i}
            ref={(el) => void (this.elementpossRef[i] = el?.getDom() ?? null)}
            xpos={elem.x}
            ypos={elem.y}
            rotate={elem.rotate}
            scale={elem.scale}
            />)
        })

        Array.from({ length: 3 }, (s, i) => {
            const elem :any = this.elementDatas[i]
            elemlist.push(
            <PlanetarySystem
            key={i}
            ref={(el) => void (this.elementpossRef[i] = el?.getDom() ?? null)}
            xpos={elem.x}
            ypos={elem.y}
            scale={elem.scale/3}
            nbplanet={Math.round(Math.random()*2)}
            />)
        })
            
        return (

            

            <main>
                <div className="connection_menu">
                    <button className="button">Se connecter</button>
                    <button className="secondary_button">Crée un compte</button>
                </div>
                <div>
                    {
                     elemlist       
                    }
                </div>
            </main>

        )
    }
}