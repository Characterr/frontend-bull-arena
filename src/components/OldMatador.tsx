import { Component } from "react";
import { getRandom } from "./Utils";
import { SELECTED_APPLAUSE, MP3_FILES, SRC_MP3 } from "./Constants";
import './Matador.css'

interface MatadorOptions {
    applause: number,
    setMatarodPosition: (nevPosition: number) => void,
    matadorPosition: number
}

let prevApplause: number;

export class OldMatador extends Component<MatadorOptions> {
    nameApplause: string;

    constructor(props: MatadorOptions) {
        super(props);
        this.nameApplause = MP3_FILES[props.applause];
    }

    movingMatador = (e: CustomEventInit) => {
        let props = this.props;
        let bullPosition = e.detail.position;

        if (bullPosition == props.matadorPosition) {
            let newMatadorPosition = getRandom(props.matadorPosition)
            props.setMatarodPosition(newMatadorPosition);
            console.log(`Matador is moving from ${props.matadorPosition} to ${newMatadorPosition}`);
        }
    };

    componentDidMount() {
        document.addEventListener('bullRun', this.movingMatador);
    }

    componentWillUnmount() {
        prevApplause = this.props.applause;
        document.removeEventListener('bullRun', this.movingMatador);
    }

    shouldComponentUpdate(nextProps: MatadorOptions) {
        let isIdenticalProps = (nextProps.applause == SELECTED_APPLAUSE && prevApplause != SELECTED_APPLAUSE) ? true : false;
        this.nameApplause = MP3_FILES[this.props.applause];

        //For some reason it does not work in this place
        // prevApplause = nextProps.applause; 

        return isIdenticalProps;
    }

    render() {
        return (
            <div>
                <audio src={SRC_MP3 + this.nameApplause} controls autoPlay className="audio"></audio>
                <img src="./matador.png" alt="i am matador" />
            </div>
        )
    }
}