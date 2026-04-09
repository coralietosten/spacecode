import React from "react";

import "./styles.css";
import Star from "../../compenents/Star";

import gsap from "gsap";
import { Observer } from "gsap/Observer";
import PlanetarySystem from "../../compenents/PlanetarySystem";
import Tablet from "../../compenents/Tablet";
import Partail from "../../compenents/Portail";

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

    index_star_data: number

    starsData: StarData[]
    private starpossRef: (HTMLImageElement | null)[] = [];

    private planetary_system: HTMLDivElement | null = null;

    constructor(props: Props) {
        super(props)

        this.cliqueOnCross = this.cliqueOnCross.bind(this);

        this.state = {
            load: null,
            stars: true
        }

        this.index_star_data = 0

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

        Observer.create({
            id: "starScroll",
            target: window,
            type: "wheel",
            debounce: true,
            onChange: (self) => {
                this.movestars(self.deltaY, self.velocityY)
            }
        })
    }

    movestars(deltaY: number = 0, velocityY: number = 0) {


        console.log(deltaY, velocityY)
        if (deltaY < 0 && this.index_star_data + 1 < this.starsData.length) {
            this.index_star_data++
        } else if (deltaY > 0 && this.index_star_data > 0) {
            this.index_star_data--
        }

        console.log(this.index_star_data)

        for (const index_star in this.starpossRef) {
            if (this.starpossRef[index_star] === null) {
                continue
            }

            gsap.to(this.starpossRef[index_star], {
                x: this.starsData[index_star].x - this.starsData[this.index_star_data].x + this.centerx,
                y: this.starsData[index_star].y - this.starsData[this.index_star_data].y + this.centery,
                xPercent: -50,
                yPercent: -50,
                ease: "power3.inOut",
                duration: 0.3
            })
        }
    }


    componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.state.load !== null && this.state.load !== prevState.load && this.planetary_system) {

            gsap.to(this.planetary_system, {
                scale: 1,
                ease: "power3.inOut",
                duration: 1.5
            })

            gsap.timeline({}).to(this.starpossRef, {
                x: (i: number) => ((this.starsData[i].x - this.starsData[this.state.load!].x) * 10 + this.centerx),
                y: (i: number) => ((this.starsData[i].y - this.starsData[this.state.load!].y) * 10 + this.centery),
                duration: 1.5,
                ease: "power3.inOut"
                
            })
            gsap.to(".portal_to_base",{
                y : "+=100vh",
                duration: 1.5,
                ease: "power3.inOut"
            })
            .then(() =>
                this.setState({ stars: false })
            )



        } else if (this.state.stars == true) {
            for (const index_star in this.starpossRef) {
                if (this.starpossRef[index_star] === null) {
                    continue
                }

                gsap.set(this.starpossRef[index_star], {
                    x: this.starsData[index_star].x - this.starsData[this.index_star_data].x + this.centerx,
                    y: this.starsData[index_star].y - this.starsData[this.index_star_data].y + this.centery,
                    xPercent: -50,
                    yPercent: -50,
                    ease: "power3.inOut",
                    duration: 0.3
                })
            }

        }
    }

    cliqueOnStar(index_star: number) {

        Observer.getById("starScroll")?.disable()

        this.setState({ load: index_star })
    }

    cliqueOnCross() {
        this.setState({ load: null, stars: true })
        Observer.getById("starScroll")?.enable()
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


        const portail = (this.state.stars === false) ? null :
            <div className="portal_to_base"><Partail nom={"BASE"} href={"/base"} /></div>

        let planetary_system = null
        let tablet = null

        if (this.state.load != null) {
            planetary_system = <PlanetarySystem nbplanet={this.state.load} scale={0} ref={(el) => void (this.planetary_system = el?.getDom() ?? null)} />
            tablet = <Tablet onCrossClick={this.cliqueOnCross} />
        }



        return (
            <main className="HTML">
                {stars}
                {portail}
                {planetary_system}
                {tablet}
            </main>
        )
    }
}


