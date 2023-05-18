import * as React from 'react';
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export default function ParticleStarsBG(props:{version?:1|2,zIndex?:number}) {

    const version = props.version || 1;
    const zIndex = props.zIndex || -10;

    function getBgColor(){
        const color = {
            1:"#08113B",
            2:"#000311"
        }
        return color[version] || "#000000"
    }

    function getStarColor(){
        const color = {
            1:["#F0FFFF"],
            2:["#F0FFFF","#FDEBD0","#F5B7B1","#FBFCFC","#F1948A","#FDFEFE"]
        }
        return color[version] || "#ffffff"
    }
    
    function getStarSize(){
        const color = {
            1:{ min: 1, max: 2.5 },
            2:{ min: 0.5, max: 1.5 }
        }
        return color[version] || 1
    }

    const particlesInit = React.useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = React.useCallback(async (container: Container | undefined) => {
    }, []);

    return (
        <Particles 
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fullScreen: {
                    enable: true,
                    zIndex: zIndex,
                },
                background: {
                    color: getBgColor(),
                    opacity: 1,

                },
                fpsLimit:60,
                interactivity:{
                    events: {
                        resize: true,
                    },
                },
                particles:{
                    color: {
                        value: getStarColor(),
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: false,
                        speed: .05,
                        straight: false,
                    },
                    number: {
                        density:{
                            enable: true,
                            area: 500,
                        },
                        value: 400,
                    },
                    opacity:{
                        animation: {
                            enable: true,
                            minimumValue: 0.05,
                            speed: 1,
                            sync: false,
                        },
                        value: { min: 0.5, max: 2 },
                    },
                    shape: {
                        type: "circle"
                    },
                    size: {
                        value: getStarSize(),
                    }
                }
        }}/>
    )

}