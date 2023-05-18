import * as React from 'react';
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export default function ParticleStarsBG(props:{}) {
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
                    zIndex: -1
                },
                background: {
                    color: "#000311"
                },
                fpsLimit:60,
                interactivity:{
                    events: {
                        resize: true,
                    },
                },
                particles:{
                    color: {
                        value: ["#F0FFFF","#FDEBD0","#F5B7B1","#FBFCFC","#F1948A","#FDFEFE"]
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
                        value: { min: 0.5, max: 1.5 },
                    }
                }
        }}/>
    )

}