import React from "react";

import "./styles.css";
import Star from "../../compenents/Star";

import gsap from "gsap";
import { Observer } from "gsap/Observer";
import PlanetarySystem from "../../compenents/PlanetarySystem";
import Tablet from "../../compenents/Tablet";

type State = {
    load: number | null
    stars: boolean
}
type Props = {}

interface StarData {
    x: number;
    y: number;
    scale: number;
    rotate: number;
}

export default class HTML extends React.Component<Props, State> {

    centerx: number
    centery: number

    starsData: StarData[]
    private starpossRef: (HTMLImageElement | null)[] = [];

    private planetary_system: HTMLDivElement | null = null;

    constructor(props: Props) {
        super(props)

        this.state = {
            load: null,
            stars: true
        }

        this.centerx = window.innerWidth / 2
        this.centery = window.innerHeight / 2

        this.starsData = []

        const nbstar = 10

        for (let i = 0; i < nbstar; i++) {
            this.starsData.push({
                x: ((Math.random() * 600) - 300) + this.centerx,
                y: 300 * -i + ((Math.random() * 50) - 25) + this.centery,
                scale: 1,
                rotate: 1
            })
        }

    }

    componentDidMount(): void {

        gsap.registerPlugin(Observer)
        Observer.getById("starScroll")?.kill()

        let index_star_data = 0
        Observer.create({
            id: "starScroll",
            target: window,
            type: "wheel",
            debounce: true,
            onChange: (self) => {
                console.log(self.deltaY, self.velocityY)
                if (self.deltaY < 0 && index_star_data + 1 < this.starsData.length) {
                    index_star_data++
                } else if (self.deltaY > 0 && index_star_data > 0) {
                    index_star_data--
                }

                console.log(index_star_data)

                for (const index_star in this.starpossRef) {
                    if (this.starpossRef[index_star] === null) {
                        continue
                    }

                    gsap.to(this.starpossRef[index_star], {
                        x: this.starsData[index_star].x - this.starsData[index_star_data].x + this.centerx,
                        y: this.starsData[index_star].y - this.starsData[index_star_data].y + this.centery,
                        xPercent: -50,
                        yPercent: -50,
                        ease: "power3.inOut",
                        duration: 0.3
                    })
                }
            }
        })
    }


    componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.state.load !== null && this.state.load !== prevState.load && this.planetary_system) {

            gsap.to(this.planetary_system, {
                scale: 1,
                ease: "power3.inOut",
                duration: 1.5
            })

            gsap.to(this.starpossRef, {
                x: (i: number) => ((this.starsData[i].x - this.starsData[this.state.load!].x) * 10 + this.centerx),
                y: (i: number) => ((this.starsData[i].y - this.starsData[this.state.load!].y) * 10 + this.centery),
                duration: 1.5,
                ease: "power3.inOut",
            }).then(() =>
                this.setState({ stars: false })
            )
        }
    }

    cliqueOnStar(index_star: number) {

        Observer.getById("starScroll")?.kill()

        console.log("clique");
        this.setState({ load: index_star })
    }

    render() {

        this.starpossRef = []

        const stars = (this.state.stars === false) ? null :
            this.starsData.map((elem, index) => (
                <Star
                    key={index}
                    ref={(el) => void (this.starpossRef[index] = el?.getDom() ?? null)}
                    xpos={elem.x}
                    ypos={elem.y}
                    rotate={elem.rotate}
                    scale={elem.scale}
                    onClick={() => this.cliqueOnStar(index)}
                />
            ))



        const planetary_system = (this.state.load == null) ? null :
            <div>
                <PlanetarySystem nbplanet={this.state.load} scale={0} ref={(el) => void (this.planetary_system = el?.getDom() ?? null)} />
                <Tablet />
            </div>

        return (
            <main>
                {stars}
                {planetary_system}
            </main>
        )
    }
}


