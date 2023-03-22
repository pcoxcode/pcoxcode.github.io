import * as NANO from "nanostores"
import { handedness } from "./PitchSelect.js"

export let selectedHand = () => {
    const $handedness = NANO.useStore(handedness)
    console.log($handedness)
}

export const speeds = {
    '25': 70,
    '30': 75,
    '65': 125 
}

