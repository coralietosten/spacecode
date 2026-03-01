import React from "react";

import "./styles.css";
import Star from "../../compenents/Star";

import gsap from "gsap";
import { Observer } from "gsap/Observer";

type State = {}
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

    starsData : StarData[]
    private starpossRef: (HTMLImageElement | null)[] = [];

    constructor(props: Props) {
        super(props)

        this.centerx = window.innerWidth / 2
        this.centery = window.innerHeight / 2

        this.starsData = []

        const nbstar = 10

        for (let i = 0; i < nbstar; i++){
            this.starsData.push({
                x: ((Math.random() * 600) - 300) + this.centerx,
                y: 300*-i + ((Math.random() * 50) - 25) + this.centery,
                scale : 1,
                rotate : 1
            })
        }

    }

    componentDidMount(): void {

        gsap.registerPlugin(Observer)
        let index_star_data = 0
        Observer.create({
            id: "starScroll",
            target : window,
            type : "wheel",
            debounce: true,
            tolerance: 20,
            onChange : (self) => {
                console.log(self.deltaY, self.velocityY)
                if (self.deltaY < 0 &&index_star_data+1 < this.starsData.length){
                    index_star_data++
                }else if(self.deltaY > 0 && index_star_data > 0){
                    index_star_data--
                }
                
                console.log(index_star_data)

                for (const index_star in this.starpossRef){
                    if (this.starpossRef[index_star] === null){
                        continue
                    }

                    gsap.to(this.starpossRef[index_star],{
                        y : this.starsData[index_star].y - this.starsData[index_star_data].y + this.centery,
                        x : this.starsData[index_star].x - this.starsData[index_star_data].x  + this.centerx,
                        xPercent:-50,
                        yPercent:-50,
                        ease: "power3.inOut",
                        duration : 0.3
                    })
                }
            }
        })
    }

    cliqueOnStar(){

        Observer.getById("starScroll")?.kill()

        console.log("clique");
        window.location.href = "/myexo"
    }

    render() {

        this.starpossRef = []

        return (
            <main>
                {
                    this.starsData.map((elem,index) => (
                        <Star
                        key={index}
                        ref={(el) => void (this.starpossRef[index] = el?.getDom() ?? null)}
                        xpos={elem.x}
                        ypos={elem.y}
                        rotate={elem.rotate}
                        scale={elem.scale}
                        onClick = {this.cliqueOnStar}
                        />
                    ))
                }
            </main>
        )
    }
}