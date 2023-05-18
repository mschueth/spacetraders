import * as React from 'react';
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export default function ParticleStarsBG(props:{}) {
    const particlesInit = React.useCallback(async (engine: Engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = React.useCallback(async (container: Container | undefined) => {
        await console.log(container);
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
                    color: "#08113B"
                },
                fpsLimit:60,
                interactivity:{
                    events: {
                        resize: true,
                    },
                },
                particles:{
                    color: {
                        value: "#F0FFFF"
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: false,
                        speed: .1,
                        straight: false,
                    },
                    number: {
                        density:{
                            enable: true,
                            area: 1000,
                        },
                        limit: 0,
                        value: 500,
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
                        value: { min: 0.5, max: 2 },
                    }
                }
        }}/>
    )

}