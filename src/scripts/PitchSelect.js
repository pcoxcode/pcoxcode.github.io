import {atom} from "nanostores"



export const ACTIVE = 'active'
export const CLICK = 'pointerdown'
export const TOGGLE_CLASS = 'hidden-pitch'
export const FASTBALL =  'Fastball'
export const SLIDER =  'Slider'
export const CHANGEUP =  'Change Up'
export const CURVE =  'Curve'
export const SPLITER =  'Spliter'
export const TWELVESIXCURVE =  '12-6 Curve'
export const RIGHT = 'Right'
export const LEFT = 'Left'

export const rightHandClockPositions = new Map ([
    [ FASTBALL, 12], 
    [ SLIDER, 3],
    [ CHANGEUP, 8],
    [ CURVE, 5],
    [ SPLITER, 6],
    [ TWELVESIXCURVE, 6 ]]
)

export const leftHandClockPositions = new Map ([
    [ FASTBALL, 12], 
    [ SLIDER, 9],
    [ CHANGEUP, 4],
    [ CURVE, 7],
    [ SPLITER, 6],
    [ TWELVESIXCURVE, 6 ]]
)

export const fastballSpeeds = new Map ([
    [ '50', '25'], 
    [ '60', '30'],
    [ '70' ,'25'], 
    [ '80' ,'30'],
    [ '90' ,'35'],
    [ '95' ,'40'],
    [ '100' ,'45'],
    [ '105' ,'50'],
    [ '110' ,'55'],
    [ '115' ,'60'],
    [ '120' ,'65']]
)

export const offspeedSpeeds = new Map ([
    [ '50', '25'], 
    [ '60', '30'],
    [ '65', '35'],
    [ '70', '40'],
    [ '75', '45'],
    [ '80', '50'],
    [ '85', '55'],
    [ '95', '60'],
    [ '100', '65'],
    [ '110' ,'65'],
    [ '115' ,'65'],
    [ '120' ,'65']

]
)
export const selectOptions = (array, select) => {
    select.addEventListener(CLICK, ()=> {
        array.forEach(selection => selection.classList.remove(ACTIVE))
        select.classList.add(ACTIVE); 
        console.log(select.innerText)
    })}

export const checkSpeed = (speedSet) => {
   if (speedSet == null) return 
   if (speedSet != FASTBALL) return offspeedSpeeds
   return fastballSpeeds
}

export const crossoverSwitch = (item, trigger, oppositeOption, option) => {
    if( item == null) return
    if( item != trigger) return oppositeOption
    return option
}

export let handedness = atom('STATE MANAGE')
    
export const convertClockPositions = (pitchObject, handselect) => {
        if(handselect==null)return
        const hand = handselect
        if(hand == LEFT) {
            handedness.set(LEFT)
            pitchObject.set(SLIDER, 9)
            pitchObject.set(CHANGEUP, 4)
            pitchObject.set(CURVE, 7)
        } 
        if (hand == RIGHT){
            handedness.set(RIGHT)
            pitchObject.set(SLIDER, 3)
            pitchObject.set(CHANGEUP, 8)
            pitchObject.set(CURVE, 5)
        }
        return pitchObject
    }

