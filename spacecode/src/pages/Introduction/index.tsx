import React from "react";

import "./styles.css";


import Star from "../../compenents/Star";
import PlanetarySystem from "../../compenents/PlanetarySystem";

import gsap, { random } from "gsap";



interface StarData {
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

export default class Introduction extends React.Component {

  private starpossRef: (HTMLImageElement | null)[] = [];
  private starsDatas: StarData[];

  private width: number;
  private height: number;

  private liveStar: number;

  constructor(props: {}) {
    super(props);

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.liveStar = Math.round(Math.random() * 100)

    this.starsDatas = Array.from({ length: 100 }, (s, i) => {
      const angle = Math.random() * 2 * Math.PI
      const distance = Math.random() * 6000 + this.width

      return ({
        x: Math.sin(angle) * distance + this.width / 2,
        y: Math.cos(angle) * distance + this.height / 2,
        scale: 1,
        rotate: Math.random() * 360
      })
    })
  }


  componentDidMount(): void {
    const planetarySystem = document.querySelector(".introduction .planetary-system")
    const planetarySystembase = document.querySelector(".introduction .planetary-system:last-child")

    const top_message = document.querySelector(".introduction .top_message_box")

    if (!planetarySystem) {
      console.error("Element .planetary-system introuvable");
      return;
    }


    function createParticle(x: number, y: number) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      document.querySelector(".scene")?.appendChild(particle);
      return particle;
    }

    const tl = gsap.timeline({ ease: "power3.inOut", })

    tl.fromTo(planetarySystem,
      {
        scale: 0,
      },
      {
        scale: 1,
        duration: 1.5,
      }
    ).fromTo(top_message, {
      width: 0
    }, {
      width: "auto",
      duration: 2,
    }//effect de lettres
    ).to(this.starpossRef, {
      x: (i: number) => (this.starsDatas[i].x - (this.width / 2)) * -0.9 + this.starsDatas[i].x,
      y: (i: number) => (this.starsDatas[i].y - (this.height / 2)) * -0.9 + this.starsDatas[i].y,
      xPercent: -50,
      yPercent: -50,
      scale: (i: number) => 0.3,
      duration: 3,
    })

      .to(planetarySystem, {
        scale: 0,
        duration: 3,
      }, "<")



    console.log("liveStar",this.liveStar)
    this.starpossRef.forEach((star, i) => {
      if (star == null || i == this.liveStar) {
        return
      }

      tl.to(star, {
        x: "+=5",
        yoyo: true,
        repeat: 3,
        duration: 0.02,
        onUpdate: () => {

          star.classList.add("starOff");
          star.src = "/assets/StarOff.svg";

          const rect = star.getBoundingClientRect();
          const cx = rect.x + rect.width / 2;
          const cy = rect.y + rect.height / 2;


          for (let j = 0; j < 3; j++) {
            const p = createParticle(cx, cy);
            const angle = Math.random() * 2 * Math.PI;
            const distance = 15 + Math.random() * 10;

            gsap.to(p, {
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0.5,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => p.remove()
            });
          }
        }
      }, "+=0.02")
    })

    const starref = this.starpossRef[this.liveStar]
    const stardata = this.starsDatas[this.liveStar]

    const cordoanteAfterzoomX = (x : number) => {
      return (x - (this.width / 2)) * -0.9 + x
    }

    const cordoanteAfterzoomY = (y : number) => {
      return (y - (this.height / 2)) * -0.9 + y
    }

    tl.to(this.starpossRef, {
      x: (i: number) => cordoanteAfterzoomX(this.starsDatas[i].x) - cordoanteAfterzoomX(stardata.x) + this.width/2,// (this.starsDatas[i].x - (this.width / 2)) * 1 + this.starsDatas[i].x,
      y: (i: number) => cordoanteAfterzoomY(this.starsDatas[i].y) - cordoanteAfterzoomY(stardata.y) + this.height/2,// (this.starsDatas[i].y - (this.height / 2)) * 1 + this.starsDatas[i].y,
      // scale: (i: number) => 1,
      duration: 2,
    },"+=1")
    .to(starref,{
      rotate:0,
      duration:2,
    },"<")

    const cordoanteAfterTranslationX = (x : number) => {
      return cordoanteAfterzoomX(x) - cordoanteAfterzoomX(stardata.x) + this.width/2
    }

    const cordoanteAfterTranslationY = (y : number) => {
      return cordoanteAfterzoomY(y) - cordoanteAfterzoomY(stardata.y) + this.height/2
    }


    tl.to(this.starpossRef, {
      x: (i: number) => (cordoanteAfterTranslationX(this.starsDatas[i].x) - (this.width / 2)) * 100 + cordoanteAfterTranslationX(this.starsDatas[i].x),
      y: (i: number) => (cordoanteAfterTranslationY(this.starsDatas[i].y) - (this.height / 2)) * 100 + cordoanteAfterTranslationY(this.starsDatas[i].y),
      scale: (i: number) => 1,
      duration: 3,
      ease: "power3.inOut",
    })
    .fromTo(planetarySystembase,{
      scale : 0
    },{
      scale : 1,
      duration : 3,
      onComplete: ()=>{
        window.location.href = "/base"
      }
    },"<") // faire venire tout les élément de la base petit a petit
    

  }



  render() {
    return (
      <div className="introduction">
        <PlanetarySystem
          nbplanet={4}
        />

        <div className="top_message_box">

          <h1 className="top_message">
            Il y a très longtemps, les planètes tournaient autour d'étoiles qui brillaient de mille feux.
          </h1>
        </div>

        <div className="scene">
          {
            this.starsDatas.map((elem, index) => (
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
        </div>
        <PlanetarySystem
          nbplanet={4}
        />
      </div>
    );
  }
}