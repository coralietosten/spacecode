import React from "react";

import "./styles.css";

import Obite from "../../compenents/Obite";
import Star from "../../compenents/Star";
import Planet from "../../compenents/Planet";

import gsap from "gsap";


type State = {}
type Props = {
    nbplanet : number
    scale? : number
    xpos? : number
    ypos? : number
}

interface PlanetData{
    rayon : number 
    scale : number
    speed : number
    startangle : number
}

export default class PlanetarySystem extends React.Component<Props, State> {

    centerx :number
    centery :number
    planetes : PlanetData[]
    planetesDOM : (SVGSVGElement|null)[] = []

    planetary_system_ref = React.createRef<HTMLDivElement>();

    constructor(props : Props){
        super(props)
        
        if (this.props.xpos && this.props.ypos){
            this.centerx = this.props.xpos
            this.centery = this.props.ypos
        }else{
            this.centerx = window.innerWidth/2
            this.centery = window.innerHeight/2
        }

        this.planetes = []
        for ( let  i = 0; i< this.props.nbplanet ; i++){
            this.planetes.push({
                rayon : i*100 +100,
                scale : i*0.25+0.5,
                speed : 0.2*(3-i) + 0.1,
                startangle : Math.random() * Math.PI * 2
            })
        }



    }

    public getDom(): HTMLDivElement | null {
        return this.planetary_system_ref.current;
    }

    componentDidMount() {
        const planetary_system = this

        for (const planete_id in this.planetes){
            const planete = this.planetes[planete_id]
            gsap.to({}, {
            duration: 10 / planete.speed,
            repeat: -1,
            ease: "none",
            onUpdate: function () {
                const progress = this.progress();
                const angle = (planete.startangle + (progress * Math.PI * 2)) % Math.PI * 2;
                const newX = planete.rayon * Math.cos(angle);
                const newY = planete.rayon * Math.sin(angle);

                gsap.set(planetary_system.planetesDOM[planete_id], {
                    x: newX,
                    y: newY,
                    xPercent : -50,
                    yPercent : -50,
                });
            }
        });
        }
    }
    
    static defaultProps = {
        scale: 1
    }

    render() {
        this.planetesDOM= []
        
        return (
                <div className="planetary-system" //style={{ top: this.centery, left: this.centerx }}
                style={{
                    position: "absolute",
                    transform:  `
                        translate(${this.centerx}px, ${this.centery}px)
                        scale(${this.props.scale},${this.props.scale})
                    `,
                }}
                ref={this.planetary_system_ref}>
                    <Star />

                    {
                        this.planetes.map((elem,index)=>(
                            <Obite key={index} scale={elem.rayon/100} />
                        ))
                    }
                    {
                        this.planetes.map((elem,index)=>(
                            <Planet key={index} scale={elem.scale} distance={elem.rayon} rad={elem.startangle} ref={(el) => void (this.planetesDOM[index] = el?.getDom() ?? null)} />
                        ))
                    }
                </div>

        )
    }
}