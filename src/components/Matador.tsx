import { memo, useEffect, useState } from "react";
import { getRandom } from "./Utils";
import { SELECTED_APPLAUSE, MP3_FILES, SRC_MP3 } from "./Constants";
import './Matador.css'

interface MatadorOptions {
    applause: number,
    setMatarodPosition: (nevPosition: number) => void,
    matadorPosition: number
}

/* Save to global memory. Get access to all objects (matador). 
Saving the previous type of applause */
let prevApplause: number;

export const Matador = memo((props: MatadorOptions) => {
    let [nameApplause, setNameApplause] = useState(MP3_FILES[props.applause]);

    /* Change of applause */
    useEffect((): any => {
        setNameApplause(MP3_FILES[props.applause]);
    }), [props.applause];

    /* Change of matadorPosition */
    useEffect(() => {
        function movingMatador(e: CustomEventInit) {
            let bullPosition = e.detail.position;

            if (bullPosition == props.matadorPosition) {
                let newMatadorPosition = getRandom(props.matadorPosition)
                props.setMatarodPosition(newMatadorPosition);
                console.log(`Matador is moving from ${props.matadorPosition} to ${newMatadorPosition}`);
            }
        }

        document.addEventListener('bullRun', movingMatador);

        return () => document.removeEventListener('bullRun', movingMatador);

    }, []);

    return (
        <div>
            <audio src={SRC_MP3 + nameApplause} controls autoPlay className="audio"></audio>
            <img src="./matador.png" alt="i am matador" />
        </div>
    )
}, /* Render , only if the condition is met */
    (prev, next) => {
        let isIdenticalProps = (next.applause == SELECTED_APPLAUSE && prevApplause != SELECTED_APPLAUSE) ? false : true;
        prevApplause = next.applause;
        return isIdenticalProps;
    }
);