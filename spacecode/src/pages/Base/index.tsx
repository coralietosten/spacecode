import React from "react";

import "./styles.css";


import PlanetarySystem from "../../compenents/PlanetarySystem";
import Partail from "../../compenents/Portail";

type State = {}
type Props = {}



export default class Base extends React.Component<Props, State> {

    centerx: number
    centery: number

    PortailList: { nom: string, href: string }[]

    constructor(props: Props) {
        super(props)

        this.centerx = window.innerWidth / 2
        this.centery = window.innerHeight / 2

        this.PortailList = [
            { nom: "HTML", href: "/HTML" },
            { nom: "CSS", href: "/CSS" },
            { nom: "JS", href: "/JS" },
        ]

    }

    render() {
        return (
            <main>
                {
                    this.PortailList.map((elem, index) => {

                        const distance = 400

                        const anglais = Math.PI * 2 * -(index/this.PortailList.length) - Math.PI

                        const xpos = this.centerx + (Math.sin(anglais) * distance!)
                        const ypos = this.centery + (Math.cos(anglais) * distance!)

                        return <Partail xpos={xpos} ypos={ypos} nom={elem.nom} href={elem.href} />
                    })
                }
                <PlanetarySystem nbplanet={3} />
            </main>
        )
    }
}