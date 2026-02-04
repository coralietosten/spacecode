import React from "react";

import "./styles.css";


import Star from "../../compenents/Star";


import gsap from "gsap";

interface StarData {
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

export default class Animation extends React.Component {
  private starpossRef: (HTMLImageElement | null)[] = [];
  private starsDatas: StarData[];

  private star1ref: (HTMLImageElement | null) = null
  private star1: StarData;

  private tl1?: gsap.core.Timeline;
  private tl2?: gsap.core.Timeline;

  private width: number;
  private height: number;

  constructor(props: {}) {
    super(props);

    this.width = window.innerWidth
    this.height = window.innerHeight

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

    this.star1 = {
      x: this.width / 2,
      y: this.height / 2,
      scale: 1,
      rotate: 0
    }

  }

  componentDidMount() {


    //zoom
    this.tl1 = gsap.timeline();
    this.tl2 = gsap.timeline();


    console.log("this.starpossRef.length", this.starpossRef.length)

    this.tl1.to(this.starpossRef, {
      x: (i: number) => (this.starsDatas[i].x - (this.width / 2)) * -0.9 + this.starsDatas[i].x,
      y: (i: number) => (this.starsDatas[i].y - (this.height / 2)) * -0.9 + this.starsDatas[i].y,
      scale: (i: number) => 0.3,
      duration: 3,
      ease: "power3.inOut",
    }).to(null, {
      duration: 1
    })


    function createParticle(x: number, y: number) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      document.querySelector(".scene")?.appendChild(particle);
      return particle;
    }


    this.starpossRef.forEach((star, i) => {

      if (!star) return;

      this.tl1!.call(() => {
        gsap.to(star, {
          x: "+=5",
          yoyo: true,
          repeat: 3,
          duration: 0.05,
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
        })
      }, undefined, "+=0.05"); // décalage entre les étoiles
    });

    this.tl1.to(this.starpossRef, {
      x: (i: number) => (this.starsDatas[i].x - (this.width / 2)) * 1 + this.starsDatas[i].x,
      y: (i: number) => (this.starsDatas[i].y - (this.height / 2)) * 1 + this.starsDatas[i].y,
      scale: (i: number) => 0.8,
      duration: 2,
      ease: "power3.inOut",
    }, "+=5")



    this.tl2.to(this.star1ref, {
      scale: (i: number) => 0.3,
      duration: 2,
      ease: "power3.inOut",
    }).to(this.star1ref, {
      scale: (i: number) => 0.8,
      duration: 2,
      ease: "power3.inOut",
    })


  }

  componentWillUnmount() {
    if (this.tl1) this.tl1.kill();
    if (this.tl2) this.tl2.kill();
  }

  render() {


    this.starpossRef = []

    console.log(this.star1)
    console.log(this.width,this.height)

    return (
      <div className="viewport">
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

          <Star
            ref={(el) => void (this.star1ref = el?.getDom() ?? null)}
            xpos={this.star1.x}
            ypos={this.star1.y}
          />
        </div>
      </div>
    );
  }
}