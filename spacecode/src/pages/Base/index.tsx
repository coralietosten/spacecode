import React from "react";

import "./styles.css";

import Obite from "../../compenents/Obite";
import Star from "../../compenents/Star";
import Planet from "../../compenents/Planet";

type State = {}
type Props = {}

export default class Base extends React.Component<Props, State> {


    render(){
        const width = window.innerWidth
        const hight = window.innerHeight
        return(
            <main>
                <div className="planetary-system" style={{top:hight/2,left:width/2}}>
                    <Star/>
                    <Obite/>
                    <Obite scale={2}/>
                    <Planet scale={0.4} distance={100} rad={Math.random()*Math.PI*2}/>
                    <Planet scale={0.6} distance={200} rad={Math.random()*Math.PI*2}/>

                </div>
            </main>

        )
    }
}