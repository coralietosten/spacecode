import React from "react";

import "./styles.css";
import Star from "../../compenents/Star";



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
        for (let i = 0; i < 4; i++){
            this.starsData.push({
                x: ((Math.random() * 100) - 50) + this.centerx,
                y: 300*-i + ((Math.random() * 50) - 25) + 300*4, //this.centery,
                scale : 1,
                rotate : 1
            })
        }

    }

    componentDidMount(): void {
        var myInput :any = document.getElementById('my-input')!;
        var myInputCntnr :any= document.querySelector('*')!;
        myInput.value = 0;
        myInputCntnr.onmousewheel = function(e:any) {
        console.log(e.deltaY);
        if(e.deltaY > 1) {
            myInput.value++;
        } else if (e.deltaY < -1) {
            myInput.value--;
        }
        }
    }

    // componentDidMount() {
    //     const planetary_system = this

    //     for (const planete_id in this.planetes){
    //         const planete = this.planetes[planete_id]
    //         gsap.to({}, {
    //         duration: 10 / planete.speed,
    //         repeat: -1,
    //         ease: "none",
    //         onUpdate: function () {
    //             const progress = this.progress();
    //             const angle = (planete.startangle + (progress * Math.PI * 2)) % Math.PI * 2;
    //             const newX = planete.rayon * Math.cos(angle);
    //             const newY = planete.rayon * Math.sin(angle);

    //             gsap.set(planetary_system.planetesDOM[planete_id], {
    //                 x: newX,
    //                 y: newY,
    //                 xPercent : -50,
    //                 yPercent : -50,
    //             });
    //         }
    //     });
    //     }
        
    // }

    render() {
        return (
            <main>
                <input id="my-input" type="number" min="0" max="100" />
                {
                    this.starsData.map((elem,index) => (
                        <Star
                        key={index}
                        ref={(el) => void (this.starpossRef[index] = el?.getDom() ?? null)}
                        xpos={elem.x}
                        ypos={elem.y}
                        rotate={elem.rotate}
                        scale={elem.scale}
                        />
                    ))
                }
            </main>
        )
    }
}